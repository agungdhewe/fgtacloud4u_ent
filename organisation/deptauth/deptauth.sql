CREATE TABLE `mst_deptauth` (
	`deptauth_id` varchar(10) NOT NULL , 
	`deptauth_name` varchar(60) NOT NULL , 
	`deptauth_descr` varchar(90)  , 
	`empl_id` varchar(14)  , 
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

# SEMENTARA DISABLE RELASI KE mst_empl
# ALTER TABLE `mst_deptauth` ADD CONSTRAINT `fk_mst_deptauth_mst_empl` FOREIGN KEY (`empl_id`) REFERENCES `mst_empl` (`empl_id`);

# TABLE DUMMY mst_empl
CREATE TABLE `mst_empl` (
	`empl_id` varchar(14) NOT NULL , 
	`empl_name` varchar(60) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`empl_id`)
) 
ENGINE=InnoDB
COMMENT='Tabel dummy master karyawan';

# SAMPLE DATA DUMMY
INSERT INTO mst_empl (`empl_id`, `empl_name`, `_createby`) values ('sample-empl-1', 'JESSICA', 'fgtacloud');
INSERT INTO mst_empl (`empl_id`, `empl_name`, `_createby`) values ('sample-empl-2', 'ABDUL GHAFAR', 'fgtacloud');
INSERT INTO mst_empl (`empl_id`, `empl_name`, `_createby`) values ('sample-empl-3', 'ARNAZ KAFEEYA', 'fgtacloud');
INSERT INTO mst_empl (`empl_id`, `empl_name`, `_createby`) values ('sample-empl-4', 'LUKE ADRIAN ', 'fgtacloud');
INSERT INTO mst_empl (`empl_id`, `empl_name`, `_createby`) values ('sample-empl-5', 'LANA VIRTUA', 'fgtacloud');





