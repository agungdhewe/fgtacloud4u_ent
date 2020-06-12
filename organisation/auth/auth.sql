CREATE TABLE `mst_auth` (
	`auth_id` varchar(30) NOT NULL , 
	`auth_name` varchar(60) NOT NULL , 
	`auth_descr` varchar(90)  ,
	`authlevel_id` varchar(10) NOT NULL ,  
	`empl_id` varchar(14)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `auth_name` (`auth_name`),
	PRIMARY KEY (`auth_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Authorisasi';

ALTER TABLE `mst_auth` ADD KEY `empl_id` (`empl_id`);
ALTER TABLE `mst_auth` ADD KEY `authlevel_id` (`authlevel_id`);

ALTER TABLE `mst_auth` ADD CONSTRAINT `fk_mst_auth_mst_empl` FOREIGN KEY (`empl_id`) REFERENCES `mst_empl` (`empl_id`);
ALTER TABLE `mst_auth` ADD CONSTRAINT `fk_mst_auth_mst_authlevel` FOREIGN KEY (`authlevel_id`) REFERENCES `mst_authlevel` (`authlevel_id`);





