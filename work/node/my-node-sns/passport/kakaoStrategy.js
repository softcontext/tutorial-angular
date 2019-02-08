const KakaoStrategy = require('passport-kakao').Strategy;
const { User } = require('../models');

module.exports = (passport) => {
  passport.use(new KakaoStrategy({
    // clientID는 카카오가 발급하는 컨슈머 아이디다.
    clientID: process.env.KAKAO_ID,
    // callbackURL은 카카오로부터 인증 결과를 받을 라우터 주소다.
    callbackURL: '/auth/kakao/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    console.log('======================================');
    console.log('accessToken: ' + accessToken);
    console.log('refreshToken: ' + refreshToken);
    console.log('profile: ' + profile);
    console.log('======================================');
    
    // done 함수는 passport.authenticate() 메소드에게 전달 된 콜백함수를 호출한다.
    
    try {
      const exUser = await User.find({
        where: {
          snsId: profile.id,
          provider: 'kakao'
        }
      });
      
      if (exUser) {
        // 이미 등록 된 회원이면 바로 passport.authenticate() 메소드의 콜백함수를 호출한다.
        done(null, exUser);
      } else {
        // 신규 회원이면 등록하고 난 후, passport.authenticate() 메소드의 콜백함수를 호출한다.
        const newUser = await User.create({
          email: profile._json && profile._json.kaccount_email,
          nick: profile.displayName,
          snsId: profile.id,
          provider: 'kakao'
        });
        console.log('======================================');
        console.log('newUser: ' + newUser);
        console.log('======================================');
        
        done(null, newUser);
      }
    } catch (err) {
      console.error(err);
      done(err);
    }
  }));
};
