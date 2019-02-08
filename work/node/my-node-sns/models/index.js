// 'use strict';

// const fs = require('fs');
// const path = require('path');
const Sequelize = require('sequelize');

// const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = sequelize['import'](path.join(__dirname, file));
//     db[model.name] = model;
//   });
// 
// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

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
