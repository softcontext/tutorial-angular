CREATE TABLE IF NOT EXISTS `users` (
  `id` INTEGER NOT NULL auto_increment , 
  `name` VARCHAR(20) NOT NULL UNIQUE, 
  `age` INTEGER UNSIGNED NOT NULL, 
  `married` TINYINT(1) NOT NULL, 
  `comment` TEXT, 
  `created_at` DATETIME NOT NULL DEFAULT now(), 
  PRIMARY KEY (`id`)
) comment='사용자 정보' default charset=utf8 ENGINE=InnoDB;

INSERT INTO users(name, age, married, comment) VALUES('john', 24, 0, 'programmer');
INSERT INTO users(name, age, married, comment) VALUES('tom', 32, 1, 'actor');
