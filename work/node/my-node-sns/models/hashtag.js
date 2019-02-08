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
