const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, done) => {
    // 세 번째 파라미터 done은 passport.authenticate() 메소드의 콜백함수를 호출하는 것이다.
    // ==> done(authError, user, info)
    try {
      const exUser = await User.find({
        where: {
          email
        }
      });
      
      if (exUser) {
        // 패스워드를 암호화 한 다음 데이터베이스에 저장된 exUser.password 값과 비교한다.
        const result = await bcrypt.compare(password, exUser.password);
        
        if (result) {
          done(null, exUser, {
            message: 'Success'
          });
        } else {
          done(null, false, {
            message: 'Fail: password is not correct'
          })
        }
      } else {
        done(null, false, {
          message: 'Fail: email is not exist'
        })
      }
    } catch (err) {
      console.error(err);
      done(err);
    }
  }));
};
