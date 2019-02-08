const { User, Post, Hashtag } = require('../models');

// Insert Dummy Data for Test
module.exports = async () => {
  try {
    // password: '1234'
    await User.create({ email: 'x@y.z', nick: 'xman', password: '$2b$12$Dh6bJUnPg4wUacNXBJfd6.x.vOio1qwLc/UQ8VYPhvXREkuyYHQYe' });
    console.log('▶ 1 User inserted.');
    
    await Post.create({ content: 'xxx', userId: 1 });
    console.log('▶ 1 Post inserted.');
    
    await Hashtag.create({ title: 'Node' });
    console.log('▶ 1 Hashtag inserted.');
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// CREATE TABLE `follow` (
// 	`createdAt` DATETIME NOT NULL,
// 	`updatedAt` DATETIME NOT NULL,
// 	`followingId` INT(11) NOT NULL,
// 	`followerId` INT(11) NOT NULL,
// 	PRIMARY KEY (`followingId`, `followerId`),
// 	INDEX `followerId` (`followerId`),
// 	CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`followingId`) REFERENCES `users` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
// 	CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`followerId`) REFERENCES `users` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
// )
// COLLATE='utf8_general_ci'
// ENGINE=InnoDB;

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

// CREATE TABLE `posthashtag` (
// 	`createdAt` DATETIME NOT NULL,
// 	`updatedAt` DATETIME NOT NULL,
// 	`postId` INT(11) NOT NULL,
// 	`hashtagId` INT(11) NOT NULL,
// 	PRIMARY KEY (`postId`, `hashtagId`),
// 	INDEX `hashtagId` (`hashtagId`),
// 	CONSTRAINT `posthashtag_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
// 	CONSTRAINT `posthashtag_ibfk_2` FOREIGN KEY (`hashtagId`) REFERENCES `hashtags` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
// )
// COLLATE='utf8_general_ci'
// ENGINE=InnoDB;

// CREATE TABLE IF NOT EXISTS `hashtags` (
//   `id` INTEGER NOT NULL auto_increment , 
//   `title` VARCHAR(40) NOT NULL UNIQUE, 
//   `createdAt` DATETIME NOT NULL, 
//   `updatedAt` DATETIME NOT NULL, 
//   `deletedAt` DATETIME, 
//   PRIMARY KEY (`id`)
// ) ENGINE=InnoDB;
