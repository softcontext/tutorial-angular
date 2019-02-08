# Node Express SNS Project

pug 대신 hbs 사용

**참고**

* Node.js 교과서 조현영 길벗

# 새 프로젝트

```bash
$ express my-node-sns --view=hbs --css=sass
$ cd my-node-sns
$ npm i
```

**Nodemon**

개발 중 코드가 수정되면 자동으로 테스트 서버를 재기동해 주는 기술입니다. 특별한 설정은 필요하지 않고 실제 사용할 때 명령으로 적용합니다.

```bash
$ npm i -g nodemon
$ npm i --save-dev nodemon
```

## 1. Dotenv

보안상 중요한 정보를 별도의 파일(.env)로 분리하고 이를 process.env 환경변수에 등록해 주는 기술입니다.

```bash
$ npm i dotenv
```

**.env**

```env
COOKIE_SECRET=secret seed
```

**app.js**

```js
// 사용하기로 약속된 .env 파일을 로드하고
// 키=값 형태의 정보를 파싱하여 process.env에 추가한다.
require('dotenv').config();

app.use(cookieParser(process.env.COOKIE_SECRET));
```

## 2. Session

서버에 접속한 사용자 정보를 관리하는 세션 객체를 사용할 수 있게 해주는 기술입니다. 세션은 쿠키를 기반으로 작동하므로 쿠키 처리를 위한 미들웨어가 필요합니다. 이는 cookie-parser 패키지가 처리합니다. cookie-parser는 프로젝트 제너레이트 시 자동으로 설정됩니다. 세션 설정은 쿠키 설정 뒤에 합니다.

```bash
$ npm i express-session
```

**app.js**

```js
const session = require('express-session');

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
```

## 3. Flash Message

1회성 메시지를 사용자에게 전달할 필요가 있을 때 사용하는 기술입니다. POST-REDIRECT-GET 패턴 시 필요한 기술입니다.

**connect-flash**

```bash
$ npm i connect-flash
```

**app.js**

```js
const flash = require('connect-flash');

app.use(flash());
```

## 4. Sequelize

자바스크립트에서 이용할 수 있는 ORM 기술입니다.

```bash
$ npm i -g sequelize-cli
$ npm i sequelize mysql2
$ sequelize init

Sequelize CLI [Node: 10.14.1, CLI: 5.4.0, ORM: 4.42.0]

Created "config\config.json"
Successfully created models folder at "C:\...\my-node-sns\models".
Successfully created migrations folder at "C:\...\my-node-sns\migrations".
Successfully created seeders folder at "C:\...\my-node-sns\seeders".
```

### 데이터베이스 연결

**app.js**

```js
const { sequelize } = require('./models');

if (app.get('env') === 'development') {
  // If force is true, each Model will run DROP TABLE IF EXISTS, 
  // before it tries to create its own table
  sequelize.sync({
    force: true,
  }).then(() => {
    // Insert Dummy Data for Test
    // require('./sql/dummy')();
  });
} else {
  sequelize.sync();
}
```

**config\config.json**

```json
{
  "development": {
    "username": "root",
    "password": "1111",
    "database": "node_sns_dev",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

다음 명령으로 디비를 새성할 수 있습니다.

```bash
$ sequelize db:create
```

### Entity 설계

**models\user.js**

```js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    email: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
    },
    nick: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    provider: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: 'local',
    },
    snsId: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
  }, {
    timestamps: true,
    paranoid: true,
  })
}

// CREATE TABLE IF NOT EXISTS `users` (
//   `id` INTEGER NOT NULL auto_increment , 
//   `email` VARCHAR(40) NOT NULL UNIQUE, 
//   `nick` VARCHAR(15) NOT NULL, 
//   `password` VARCHAR(100), 
//   `provider` VARCHAR(10) NOT NULL DEFAULT 'local', 
//   `snsId` VARCHAR(30), 
//   `createdAt` DATETIME NOT NULL, 
//   `updatedAt` DATETIME NOT NULL, 
//   `deletedAt` DATETIME, 
//   PRIMARY KEY (`id`)
// ) ENGINE=InnoDB;
```

**models\post.js**

```js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('post', {
    content: {
      type: DataTypes.STRING(140),
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
  }, {
    timestamps: true,
    paranoid: true,
  })
}

// CREATE TABLE IF NOT EXISTS `posts` (
//   `id` INTEGER NOT NULL auto_increment , 
//   `content` VARCHAR(140) NOT NULL, 
//   `img` VARCHAR(200), 
//   `createdAt` DATETIME NOT NULL, 
//   `updatedAt` DATETIME NOT NULL, 
//   `deletedAt` DATETIME, 
//   `userId` INTEGER, 
//   PRIMARY KEY (`id`), 
//   FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
// ) ENGINE=InnoDB;
```

**models\hashtag.js**

```js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('hashtag', {
    title: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
    },
  }, {
    timestamps: true,
    paranoid: true,
  })
}

// CREATE TABLE IF NOT EXISTS `hashtags` (
//   `id` INTEGER NOT NULL auto_increment , 
//   `title` VARCHAR(40) NOT NULL UNIQUE, 
//   `createdAt` DATETIME NOT NULL, 
//   `updatedAt` DATETIME NOT NULL, 
//   `deletedAt` DATETIME, 
//   PRIMARY KEY (`id`)
// ) ENGINE=InnoDB;
```

**models\index.js**

```js
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);

// Post 테이블에 userId 칼럼을 추가한다.
// foreignKey: 'userId' 설정을 생략해도 userId 이름으로 칼럼이 추가된다.
db.User.hasMany(db.Post, {
  // sourceKey: 'id',
  // foreignKey: 'userId', 
  onDelete: 'cascade',
});
db.Post.belongsTo(db.User, {
  // targetKey: 'id',
  // foreignKey: 'userId', 
});

// N:M 관계를 1:N 관계로 해소하기 위해서 PostHashtag라는 조인테이블을 생성한다.
// postId, hashtagId 칼럼을 추가한다.
// Post.getHashtags(), Post.addHashtags()
// Hashtag.getPosts(), Hashtag.addPosts() 메소드가 추가된다.
db.Post.belongsToMany(db.Hashtag, {through: 'PostHashtag'});
db.Hashtag.belongsToMany(db.Post, {through: 'PostHashtag'});

// CREATE TABLE IF NOT EXISTS `PostHashtag` (
//   `createdAt` DATETIME NOT NULL, 
//   `updatedAt` DATETIME NOT NULL, 
//   `postId` INTEGER , 
//   `hashtagId` INTEGER , 
//   PRIMARY KEY (`postId`, `hashtagId`), 
//   FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, 
//   FOREIGN KEY (`hashtagId`) REFERENCES `hashtags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
// ) ENGINE=InnoDB;

// 하나의 테이블이 N:M 관계를 갖고 있다.
// Follow라는 조인테이블을 생성한다.
// as 옵션은 시퀄라이즈가 조인 시 사용하는 이름이다.
// as 옵션을 바탕으로 
// User.getFollowings, User.getFollowers, 
// User.addFollwing, User.addFollower 메소드가 추가된다.
db.User.belongsToMany(db.User, {
  foreignKey: 'followingId',
  as: 'Followers',
  through: 'Follow',
});
db.User.belongsToMany(db.User, {
  foreignKey: 'followerId',
  as: 'Followings',
  through: 'Follow',
});

// CREATE TABLE IF NOT EXISTS `Follow` (
//   `createdAt` DATETIME NOT NULL, 
//   `updatedAt` DATETIME NOT NULL, 
//   `followingId` INTEGER , 
//   `followerId` INTEGER , 
//   PRIMARY KEY (`followingId`, `followerId`), 
//   FOREIGN KEY (`followingId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, 
//   FOREIGN KEY (`followerId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
// ) ENGINE=InnoDB;

module.exports = db;
```

작업결과로써 테이블은 총 5개가 생성되며 테이블 사이에 관계는 다음과 같습니다.

`User --1:N-- Follow --N:1-- User --1:N-- Post --1:N-- PostHashtag --N:1-- Hashtag`

Follow는 조인 테이블로써 다음 N:M 관계를 해소합니다.

* User는 다수의 팔로워인 User를 가진다.
* User는 다수의 User를 팔로잉할 수 있다.

PostHashtag는 조인 테이블로써 다음 N:M 관계를 해소합니다.

* Post는 다수의 Hashtag를 가진다.
* Hashtag는 다수의 Post에 사용될 수 있다.

## 5. Passport

사용자 인증을 처리하는 기술입니다. 다양한 프로바이더와 인증을 연동하는 작업 시 매우 편리합니다. bcrypt는 패스워드를 암호화할 때 사용하는 기술입니다.

```bash
$ npm i passport passport-local passport-kakao bcrypt
```

### 패스포트의 작동원리

#### Step 1. 환경설정

1. 초기설정: `passport\index.js`
- passport.serializeUser(): 무엇을 세션에 저장할 것인지 결정하는 메소드
- passport.deserializeUser(): 어떻게 회원인지 확인할 것인지 결정하는 메소드
- localStrategy, kakaoStrategy: 사용하는 로그인 전략을 등록

**app.js**

```js
const passport = require('passport');
require('./passport')(passport);
```

2. 미들웨어 설정
- 패스포트 초기화 작업: passport.initialize()
- 패스포트 세션 활성: passport.session() ==> passport.deserializeUser()

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

## 6. 라우팅 처리

**routes\middlewares.js**

```js
exports.isLoggedIn = (req, res, next) => {
  // passport는 req 객체에 isAuthenticated() 메소드를 추가한다.
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send('Login is required');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
};
```

**routes\page.js**

```js
var express = require('express');
var router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

// 로그인 한 사용자만 프로파일 정보를 조회할 수 있다.
router.get('/profile', isLoggedIn, function(req, res, next) {
  // 로그인 한 사용자라면 passport 처리에 의해서 req 객체에 user 정보가 존재한다.
  res.json({
    title: '회원정보',
    user: req.user,
  });
});

// 로그인 하지 않은 상태에 사용자만 신규 회원가입을 할 수 있다.
router.get('/join', isNotLoggedIn, function(req, res, next) {
  res.json({
    title: '회원가입',
    user: null,
    joinError: req.flash('Signup Error'),
  });
});

router.get('/', function(req, res, next) {
  res.json({
    title: '메인화면',
    twits: [],
    user: req.user,
    loginError: req.flash('Login Error'),
  });
});

module.exports = router;
```

**routes\auth.js**

```js
const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({
      where: {
        email
      }
    });
    
    // 이미 존재하는 이메일로 신규 회원가입을 할 수 없다.
    if (exUser) {
      req.flash('joinError', 'Email is duplicated.');
      return res.redirect('/join');
    }
    
    // 패스워드는 암호화한 후 신규 회원정보를 디비에 등록한다.
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash
    });
    
    // 신규 회원등록 후 사용자에게 보여줄 곳으로 리다이렉트 한다.
    return res.redirect('/');
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

// 1: URL로 로그인을 요청한다.
router.post('/login', isNotLoggedIn, (req, res, next) => {
  // 2: passport.authenticate() 메소드를 호출한다.
  // 3: 'local' 로그인 전략을 수행한다.
  // - 콜백함수는 LocalStrategy에서 done() 함수를 사용할 때 호출된다.
  passport.authenticate('local', (authError, user, info) => {
    // C: 서버 에러(장애 발생)
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    
    // B: 잘 못된 정보: 패스워드 
    // or 
    // B: 잘 못된 정보: 이메일(아이디)
    if (!user) {
      req.flash('loginError', info.message);
      return res.redirect('/');
    }
    
    // A: 성공
    // 4: 로그인 성공 시 user 객체를 전달하면서 req.login() 메소드를 호출한다.
    // 5: req.login() 메소드 내부에서 passport.serializeUser() 메소드에게 전달 된 콜백함수를 호출된다.
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

router.get('/logout', isLoggedIn, (req, res) => {
  // passport가 추가한 req.logout() 메소드는 req.user 객체를 제거하는 임무를 수행한다.
  req.logout();
  // 세션에 저장된 user.id를 제거한다.
  req.session.destroy();
  // 로그아웃 작업 후 사용자에게 보여줄 곳으로 리다이렉트 한다.
  res.redirect('/');
});

// 로그인 화면에서 이 라우팅 함수와 연동하는 링크를 제공해야 한다.
// 카카로 로그인 과정이 시작된다. 즉, passport\kakaoStrategy.js 파일내 코드가 수행된다.
router.get('/kakao', passport.authenticate('kakao'));

// 카카오 개발자로 등록하고 앱을 등록할 때 URL을 지정하는 작업을 먼저 수행해야 한다.
// 카카오에서 인증을 수행한 후 이 URL로 리다이트를 해 준다.
router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/'
}), (req, res) => {
  // 로그인 처리 성공 후 사용자에게 보여줄 곳으로 리다이렉트 한다.
  res.redirect('/');
})

module.exports = router;
```

지금까지 작업한 app.js 파일의 내용은 다음과 같습니다.

**app.js**

```js
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

// ## 1
// 사용하기로 약속된 .env 파일을 로드하고
// 키=값 형태의 정보를 파싱하여 process.env에 추가한다.
require('dotenv').config();

// ## 2
const session = require('express-session');

// ## 3
const flash = require('connect-flash');

// ## 4
const { sequelize } = require('./models');

// ## 5
const passport = require('passport');
require('./passport')(passport);

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var pageRouter = require('./routes/page');
var authRouter = require('./routes/auth');

var app = express();

// app.get('env') returns 'development' if process.env.NODE_ENV is not defined.
console.log('=======================');
console.log('MODE: ' + app.get('env'));
console.log('=======================');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));

// ## 1
app.use(cookieParser(process.env.COOKIE_SECRET));

// ## 2
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));

// ## 3
app.use(flash());

// ## 4
if (app.get('env') === 'development') {
  // If force is true, each Model will run DROP TABLE IF EXISTS, 
  // before it tries to create its own table
  sequelize.sync({
    force: true,
  }).then(() => {
    // Insert Dummy Data for Test
    // require('./sql/dummy')();
  });
} else {
  sequelize.sync();
}

// ## 5
app.use(passport.initialize());
app.use(passport.session());

// 라우팅
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/', pageRouter);
app.use('/auth', authRouter);

// 404 Not Found 에러 핸들러
app.use(function(req, res, next) {
  next(createError(404));
});

// Fall-back 에러 핸들러
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
```

프로젝트를 기동하고 Postman을 이용하여 테스트 합니다.

## 7. CORS

콘텐츠 배포자의 권리를 보호하기 위해서 도메인이 다르면 브라우저가 자바스크립트 코드의 요청을 거부할 수 있습니다. 자세한 사항은 다음 사이트를 참고하세요.  
`https://developer.mozilla.org/ko/docs/Web/HTTP/Access_control_CORS`

```bash
$ npm i cors
```

**routes\index.js**

```js
var express = require('express');
var router = express.Router();
const cors = require('cors');

router.use(cors());

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
```

추가로 app.js 파일에서 `routes\index.js` 파일을 사용하도록 변경하십시오.

모든 URL은 index.js 파일의 router로 전달되므로 간단하게 router.use(cors())라는 코드로 CORS를 적용할 수 있습니다. 아무러 설정정보 없이 사용하므로 모든 요청에 대해서 응답하는 것이 됩니다. 요청자를 필터링하기 위해서는 추가적으로 설정을 해야한다는 뜻 입니다.

다음 사이트를 참고하세요.  
`https://www.npmjs.com/package/cors`






# 앵귤러 프로젝트 [미사용]

노드 서버 측에서 HTML Engine 기술인 Pug, Handlebars, EJS 등을 사용하지 않고 뷰를 처리하는 기술로써 Angular를 사용하겠습니다. 앵귤러 프로젝트가 완료되면 빌드 후 결과물을 노드의 public 폴더에 배치하면 됩니다. 그에 따라서 앞서서 작업한 Express의 라우팅 처리 로직은 조금 수정되어야 합니다. 같이 살펴보도록 하겠습니다.

## 새 프로젝트 생성

```bash
$ ng new my-ng-sns
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS
```

```bash
$ cd my-ng-sns
$ npm i jquery popper.js bootstrap
$ npm i @types/jquery --save-dev
$ npm i font-awesome
$ npm i axios
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

**src\styles.scss**

```scss
body,
html {
  width: 100%;
  height: 100%;
}

.container {
  margin-top: 2em;
}
```

## 컴포넌트 및 서비스 생성

```bash
$ ng g c layout/header
$ ng g c page/home
$ ng g c page/sns
$ ng g c page/login
$ ng g c page/join
$ ng g c page/joinReport
$ ng g c page/profile
```

* header: 상단 네비게이션 UI를 제공한다.
* home: 첫 화면이다.
* sns: Posts 테이블의 정보를 표시한다.
* login: 로그인 화면을 제공한다.
* join: 회원가입 화면을 제공한다.
* joinReport: 회원가입 완료정보를 제공한다.
* profile: Users 테이블의 정보를 표시한다.

```bash
$ ng g s http/snsHttp
$ ng g s http/loginHttp
$ ng g s http/joinHttp
$ ng g s http/profileHttp
```

* snsHttp: Posts 테이블의 정보를 구한다.
* loginHttp: 로그인 처리를 한다.
* joinHttp: 회원가입 처리를 한다.
* profileHttp: Users 테이블의 정보를 구한다.


**src\app\app.component.html**

```html
<app-header></app-header>

<div class="container">
  <router-outlet></router-outlet>
</div>
```

**src\app\layout\header\header.component.html**

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">

  <a class="navbar-brand" routerLink="/">Angular Love</a>

  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item" routerLinkActive="active">
        <a class="nav-link" routerLink="/home">
          Home <span class="sr-only">(current)</span>
        </a>
      </li>
      <li class="nav-item" routerLinkActive="active">
        <a class="nav-link" routerLink="/sns">SNS</a>
      </li>
      <li class="nav-item" routerLinkActive="active">
        <a class="nav-link" routerLink="/login">Login</a>
      </li>
      <li class="nav-item" routerLinkActive="active">
        <a class="nav-link" routerLink="/join">Join</a>
      </li>
    </ul>
  </div>

</nav>
```
