CREATE TABLE `mst_deptauth` (
	`deptauth_id` varchar(10) NOT NULL , 
	`deptauth_name` varchar(60) NOT NULL , 
	`deptauth_descr` varchar(90)  , 
	`empl_id` varchar(10)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `deptauth_name` (`deptauth_name`),
	PRIMARY KEY (`deptauth_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Authorisasi Departement';

ALTER TABLE `mst_deptauth` ADD KEY `empl_id` (`empl_id`);

ALTER TABLE `mst_deptauth` ADD CONSTRAINT `fk_mst_deptauth_mst_empl` FOREIGN KEY (`empl_id`) REFERENCES `mst_empl` (`empl_id`);





