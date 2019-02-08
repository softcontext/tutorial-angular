const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const { User } = require('../models');

/**
 * - 데이터베이스에 존재하는 회원인지를 판단하는 전략: localStrategy
 * - 세션에 저장할 정보를 선택: passport.serializeUser ==> req.session.passport
 * - 인증된 회원정보(req.session.passport)를 사용하여 추가적으로 뷰가 필요한 회원정보를 조회: passport.deserializeUser
 *
 * FIXME: cors()와 더불어 사용할 때 passport.deserializeUser() 메소드가 호출되지 않는다.
 */

module.exports = (passport) => {
  // 패스포트는 req.session.passport.user 형태로 저장하는데
  // 저장되는 정보는 사용자가 결정한다.
  passport.serializeUser((user, done) => {
    console.log('passport.serializeUser ~ cb() called.');
    console.log('req.session.passport.user: ', user.dataValues);
    
    done(null, user.dataValues);
  });
  
  // passport.session() 미들웨어가 이 메소드를 호출한다.
  // serializeUser에서 done() 함수를 호출하여 넘겨 준 값이 deserializeUser의 첫 번째 매개변수로 전달된다.
  passport.deserializeUser((user, done) => {
    console.log('passport.deserializeUser ~ cb() called.');
    
    User.findOne({
        where: {
          id: user.id
        }
      })
      .then((user) => {
        // 패스포트는 req.user 형태로 정보를 저장한다. 
        done(null, user);
      })
      .catch((err) => {
        done(err);
      });
  });

  // localStrategy 로그인 전략을 등록한다.
  local(passport);
  
  // kakaoStrategy 로그인 전략을 등록한다.
  kakao(passport);
};
