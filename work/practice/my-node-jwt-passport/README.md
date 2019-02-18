# package-lock.json은 왜 필요할까?

https://hyunjun19.github.io/2018/03/23/package-lock-why-need/

package-lock.json 파일은 생성되는 시점의 의존성 트리에 대한 정확한 정보를 가지고 있습니다. package.json 파일의 의존성 선언에는 version range가 사용됩니다. version range란 특정 버전이 아니라 버전의 범위를 의미합니다. 가장 흔한 예로 npm install express를 실행하게 되면 package.json 파일에는 "^4.16.3"(Caret Ranges)로 버전 범위가 추가됩니다.

저 package.json 파일로 npm install을 실행하면 현재는 4.16.3 버전이 설치되지만 express의 새로운 minor, patch가 publish 되면 동일한 package.json 파일로 npm install을 실행해도 4.17.3, 이나 4.16.4 같은 업데이트된 버전이 설치됩니다. package-lock.json 파일은 의존성 트리에 대한 정보를 가지고 있으며 package-lock.json 파일이 작성된 시점의 의존성 트리가 다시 생성될 수 있도록 보장합니다.





-------------------------------------------------------------------





# Express Creating a skeleton website

https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website





-------------------------------------------------------------------





# 서버 프로젝트

**참고**

* https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314

```
$ express my-node-jwt-passport --view=hbs --css=sass
$ cd my-node-jwt-passport
$ npm i
```



## express-handlebars

**참고**

https://github.com/ericf/express-handlebars

hbs 설정을 삭제하고 express-handlebars 설정을 추가합니다.

**app.js**

```js
/**
 * view engine setup
 */

// 기존 설정 삭제
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

// express-handlebars 설정을 추가
var hbs = expressHandlebars.create({
  extname: 'hbs',
  defaultLayout: 'default',
  layoutsDir: __dirname + '/views/layouts/', // 기본 설정과 동일
  partialsDir: __dirname + '/views/partials/', // 기본 설정과 동일
  helpers: {
    foo: function() {
      return 'FOO!';
    },
    link: function(object) {
      let url = hbs.handlebars.escapeExpression(object.url);
      let text = hbs.handlebars.escapeExpression(object.text);
    
      return new hbs.handlebars.SafeString(
        "<a href='" + url + "'>" + text + "</a>"
      );
    }
  }
});
// console.log(Object.keys(hbs));
// [ 
//   'handlebars',
//   'extname',
//   'layoutsDir',
//   'partialsDir',
//   'defaultLayout',
//   'helpers',
//   'compilerOptions',
//   'engine',
//   'compiled',
//   'precompiled',
//   '_fsCache' 
// ]

app.engine('hbs', hbs.engine); // hbs는 hbs.engine을 실제로 사용
app.set('view engine', 'hbs'); // 뷰 엔진으로 hbs를 등록
```



## lint

```
npm i --save-dev eslint eslint-config-airbnb-base eslint-plugin-import eslint-plugin-html
```

`.eslintrc.js` 설정파일을 참조하세요.



## JWT

```
npm i jsonwebtoken cors dotenv
```



## Passport

```
$ npm i passport passport-jwt passport-local passport-kakao bcrypt
```



### 패스포트의 작동원리

- When the user logs in, the backend creates a signed token and returns it in response
- The client saves the token locally (typically in localStorage) and sends it back in every subsequent request that needs authentication
- All requests needing authentication pass through a middleware that checks the provided token and allows the request only if the token is verified

#### Step 1. 환경설정

1. 초기설정: `passport\index.js`
- passport.serializeUser(): 무엇을 세션에 저장할 것인지 결정하는 메소드
- passport.deserializeUser(): 어떻게 회원여부를 확인할 것인지 결정하는 메소드
- localStrategy, kakaoStrategy: 연동하는 로그인 전략을 등록

**app.js**

```js
const passport = require('passport');
require('./passport')(passport);
```

2. 미들웨어 설정
- 패스포트 초기화 작업: passport.initialize()
- 패스포트 세션 활성: passport.session 미들웨어가 passport.deserializeUser() 호출

**app.js**

```js
app.use(passport.initialize());
app.use(passport.session());
```

#### Step 2. 처리과정

passport는 자동으로 req 객체에 login(), logout() 메소드를 추가한다.

1. URL로 로그인을 요청한다.
  * `routes\auth.js` 파일 내 관련 코드가 존재한다.
2. passport.authenticate() 메소드를 호출한다.
  * `routes\auth.js` 파일 내 관련 코드가 존재한다.
3. 'local' 로그인 전략을 수행한다.  
  * `passport\localStrategy.js` 파일 내 `async (email, password, done){ ... }` 콜백함수가 호출된다.
4. 로그인 성공 시 user 객체를 전달하면서 req.login() 메소드를 호출한다.
  * `passport\localStrategy.js` 파일 내에서 `done(null, exUser);` 코드가 수행되면 로그인 성공으로 #4번으로 이어진다.
5. req.login() 메소드 내부에서 passport.serializeUser() 메소드에게 전달 된 콜백함수를 호출된다.
  * `passport\index.js` 파일 내 관련 코드가 존재한다.
6. passport.serializeUser() 메소드의 콜백함수가 req.session 객체에 user.id만 저장하도록 요청한다.
  * `passport\index.js` 파일 내 관련 코드가 존재한다.
7. 로그인 성공 후 사용자에게 보여주고 싶은 곳으로 리다이렉트 한다.
  * `routes\auth.js` 파일 내 관련 코드가 존재한다.

**routes\auth.js**

```js
// 1: URL로 로그인을 요청한다.
router.post('/login', isNotLoggedIn, (req, res, next) => {
  // 2: passport.authenticate() 메소드를 호출한다.
  // 3: 'local' 로그인 전략을 수행한다.
  // - 콜백함수는 LocalStrategy에서 done() 함수를 호출할 때 호출된다.
  passport.authenticate('local', (authError, user, info) => {
    // C: 서버 에러(장애 발생)
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    
    // B: 잘 못된 정보: 패스워드 or B: 잘 못된 정보: 이메일(아이디)
    if (!user) {
      req.flash('loginError', info.message);
      return res.redirect('/');
    }
    
    // A: 성공
    // 4: 로그인 성공 시 user 객체를 전달하면서 req.login() 메소드를 호출한다.
    // 5: req.login() 메소드 내부에서 passport.serializeUser() 메소드를 호출한다.
    // 6: passport.serializeUser() 메소드의 콜백함수가 req.session 객체에 user.id만 저장하도록 요청한다.
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      // 7: 로그인 성공 후 사용자에게 보여주고 싶은 곳으로 리다이렉트 한다.
      return res.redirect('/');
    })
  })(req, res, next);
  
  // 미들웨어 안에서 미들웨어를 사용할 수 있다.
  // 지금 여기서, 라우팅 처리 미들웨어 안에서 인증처리 미들웨어를 사용하고 있다.
  // 이 경우, 내부 미들웨어에서 (req, res, next)를 인자로 제공하면서 호출하면 된다.
});
```

세션에 user.id 정보가 저장되었습니다. 이는 로그인 처리가 완료되었음을 의미합니다. 사용자와 관련한 다양한 정보를 라우팅 및 뷰에서 사용할 수 있도록 조치하기 위해서 다음 단계에 처리가 필요합니다.

#### Step 3. 인증된 사용자 정보 조회

1. 모든 요청에 대해서 app.js 파일 내 설정된 passport.session() 미들웨어가 passport.deserializeUser 메소드를 호출한다.
  * `passport\index.js` 파일 내 관련 코드가 존재한다.
2. req.session에 저장된 user.id로 데이터에비스에서 사용자 정보를 조회한다.
  * `passport\index.js` 파일 내 관련 코드가 존재한다.
3. 조회된 사용자 정보를 req.user 형태로 저장한다.
  * `passport\index.js` 파일 내 관련 코드가 존재한다.
4. 여러 라우터 함수에서 req.user 객체를 사용할 수 있다. 더불어서 뷰에게 req.user  객체를 전달할 수 있다.

### 실제 작업파일 내용

**app.js**

```js
const passport = require('passport');
const passportConfig = require('./passport');
passportConfig(passport);

app.use(passport.initialize());
app.use(passport.session());
```

**passport\index.js**

```js
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const { User } = require('../models');

// 1. 디비에 회원여부 조회: localStrategy
// 2. 세션에 저장할 정보를 선택: passport.serializeUser
// 3. 뷰가 필요한 인증된 회원정보를 조회: passport.deserializeUser

module.exports = (passport) => {
  // req.session 객체에 저장할 데이터를 결정한다.
  // user.id만 session에 저장한다.
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // passport.session() 미들웨어가 이 메소드를 호출한다.
  // passport.serializeUser() 함수가 저장한 id를 받아서
  // 데이터베이스에서 정보를 조회한다.
  passport.deserializeUser((id, done) => {
    User.findOne({
        where: {
          id
        }
      })
      .then((user) => {
        // req.user에 저장한다. ==> 라우터에서 req.user 객체를 사용한다.
        done(null, user);
      })
      .catch((err) => {
        done(err);
      });
  })

  // localStrategy 로그인 전략을 등록한다.
  local(passport);
  // kakaoStrategy 로그인 전략을 등록한다.
  kakao(passport);
};
```

**passport\localStrategy.js**

```js
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = (passport) => {
  passport.use(new LocalStrategy({
    // req.body가 갖고 있는 파라미터 중 
    // 로그인 처리 시 필요한 파라미터의 키를 알려준다.
    usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, done) => {
    // 세 번째 파라미터 done은 passport.authenticate() 메소드의 콜백함수를 호출하는 것이다.
    // done(authError, user, info)
    try {
      // email(아이디)로 회원정보를 조회한다.
      const exUser = await User.find({
        where: {
          email
        }
      });
      
      if (exUser) {
        // 패스워드를 암호화 한 다음 데이터베이스에 저장된 exUser.password 값과 비교한다.
        const result = await bcrypt.compare(password, exUser.password);
        
        if (result) {
          // A: 성공
          done(null, exUser);
        } else {
          // B: 잘 못된 정보: 패스워드
          done(null, false, {
            message: 'Password is not correct.'
          })
        }
      } else {
        // B: 잘 못된 정보: 이메일(아이디)
        done(null, false, {
          message: 'No matching member information.'
        })
      }
    } catch (err) {
      console.error(err);
      // C: 서버 에러(장애 발생)
      done(err);
    }
  }));
};
```

**passport\kakaoStrategy.js**

```js
const KakaoStrategy = require('passport-kakao').Strategy;

const { User } = require('../models');

module.exports = (passport) => {
  passport.use(new KakaoStrategy({
    // clientID는 카카오가 발급하는 컨슈머 아이디다.
    clientID: process.env.KAKAO_ID,
    // callbackURL은 카카오로부터 인증 결과를 받을 라우터 주소다.
    callbackURL: '/auth/kakao/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    console.log('accessToken: ' + accessToken);
    console.log('refreshToken: ' + refreshToken);
    console.log('profile: ' + profile);
    
    // done은 passport.authenticate() 메소드의 콜백함수를 호출한다.
    
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
        
        done(null, newUser);
      }
    } catch (err) {
      console.error(err);
      done(err);
    }
  }));
};
```

.env 파일 내 `KAKAO_ID=카카오로부터 발급받은 컨슈머 아이디` 정보를 설정해야 합니다.





-------------------------------------------------------------------





# 클라이언트 프로젝트

익스프레스 프로젝트 루트 밑으로 앵귤러 프로젝트를 생성합니다.

```
$ cd my-node-jwt-passport
$ ng new client
$ cd client
```



## angular2-jwt 대신` @auth0/angular-jwt`를 사용

앵귤러 5버전까지는 `@auth0/angular-jwt`를 사용했습니다. 앵귤러 7버전에서는 대신 `angular2-jwt`를 사용합니다.

https://www.npmjs.com/package/@auth0/angular-jwt

```
$ npm i @auth0/angular-jwt
```



## 부트스트랩

```bash
$ npm i jquery popper.js bootstrap
$ npm i @types/jquery --save-dev
$ npm i font-awesome
```

**angular.json**

```json
"styles": [
  "./node_modules/font-awesome/css/font-awesome.css",
  "./node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.scss"
],
"scripts": [
  "./node_modules/jquery/dist/jquery.slim.min.js",
  "./node_modules/popper.js/dist/umd/popper.min.js",
  "./node_modules/bootstrap/dist/js/bootstrap.min.js"
]
```



## 컴포넌트, 서비스, 가드

```
$ ng g c pages/dashboard
$ ng g c pages/signin
$ ng g s services/auth
$ ng g s services/user
$ ng g g guards/auth
```

```
$ ng g interface models/token
$ ng g interface models/user
```






















