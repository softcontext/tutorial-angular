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
