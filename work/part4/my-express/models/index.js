// 'use strict';

// const fs = require('fs');
const path = require('path');
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

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Todo = require('./todo')(sequelize, Sequelize);

// 주의: 
// DELETE 시에 CASCADE되는 것은 N:M 관계일 때 뿐이며, 
// 1:1, 1:M 관계에서는 SET NULL이다.

// 1. 1(User) : N(Todo) 관계다.
// 2. Users 테이블의 id를 Todos 테이블의 owner 칼럼에 넣는다.
// 3. users 테이블의 로우 삭제 시, 해당 로우의 id 값을 FOREIGN KEY로 사용하는 
// todos 테이블의 로우도 삭제하고 싶다면 onDelete: 'cascade' 설정을 추가한다.
// ON DELETE CASCADE 옵션은 todos 테이블 생성쿼리에 설정된다.
db.User.hasMany(db.Todo, {
  sourceKey: 'id',
  foreignKey: 'owner', 
  onDelete: 'cascade',
});

db.Todo.belongsTo(db.User, {
  foreignKey: 'owner', 
  targetKey: 'id',
});

module.exports = db;
