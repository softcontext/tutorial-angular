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
