CREATE TABLE IF NOT EXISTS `todos` (
  `id` INTEGER NOT NULL auto_increment , 
  `task` VARCHAR(100) NOT NULL, 
  `done` TINYINT(1) NOT NULL DEFAULT false, 
  `created_at` DATETIME NOT NULL DEFAULT now(), 
  `updated_at` DATETIME NOT NULL DEFAULT now(), 
  `deleted_at` DATETIME, 
  `owner` INTEGER, 
  PRIMARY KEY (`id`), 
  INDEX created_at_idx (created_at DESC),
  FOREIGN KEY (`owner`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) comment='해야할 일' default charset=utf8 ENGINE=InnoDB;

INSERT INTO todos(owner, task, done) VALUES(1, 'go shpping', 1);
INSERT INTO todos(owner, task, done) VALUES(1, 'drink beer', 0);

# 주의: 
# Sequelize가 테이블을 생성하게 되면 
# DELETE 시에 CASCADE되는 것은 N:M 관계일 때 뿐이며, 
# 1:1, 1:M 관계에서는 SET NULL이다.
#
# FOREIGN KEY (`owner`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
# users 테이블의 로우 삭제 시, 해당 로우의 id 값을 FOREIGN KEY로 사용하는 
# todos 테이블의 로우의 owner 칼럼에 NULL 값을 할당한다.
# 
# FOREIGN KEY (`owner`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
# users 테이블의 로우 삭제 시, 해당 로우의 id 값을 FOREIGN KEY로 사용하는 
# todos 테이블의 로우도 삭제한다.
