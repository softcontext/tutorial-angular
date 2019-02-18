const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcrypt');
// const { User } = require('../models');
const { findAll, findOne, addOne, updateOne, deleteOne } = require('../fake-db/data');

module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'userid',
    passwordField: 'password'
  }, async (email, password, done) => {
    // 세 번째 파라미터 done은 라우팅 로직에서 사용하는 passport.authenticate() 메소드의 
    // 콜백함수를 호출하는 것을 의미한다.
    // ==> done(error, user, info(message))
    try {
      // const exUser = await User.find({
      //   where: {
      //     email
      //   }
      // });
      const exUser = findOne(email);
      
      if (exUser) {
        // 패스워드를 암호화 한 다음 데이터베이스에 저장된 exUser.password 값과 비교한다.
        // const result = await bcrypt.compare(password, exUser.password);
        const result = exUser.password === password;
        
        if (result) {
          done(null, exUser, { message: 'Success' });
        } else {
          done(null, false, { message: 'Fail: password is not correct' });
        }
      } else {
        done(null, false, { message: 'Fail: email is not exist' });
      }
    } catch (err) {
      console.error(err);
      done(err);
    }
  }));
};
