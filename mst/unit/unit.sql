CREATE TABLE `mst_unit` (
	`unit_id` varchar(10) NOT NULL , 
	`unit_name` varchar(60) NOT NULL , 
	`unit_descr` varchar(90) NOT NULL , 
	`unit_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`unitgroup_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `unit_name` (`unit_name`),
	PRIMARY KEY (`unit_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Unit';

ALTER TABLE `mst_unit` ADD KEY `unitgroup_id` (`unitgroup_id`);

ALTER TABLE `mst_unit` ADD CONSTRAINT `fk_mst_unit_mst_unitgroup` FOREIGN KEY (`unitgroup_id`) REFERENCES `mst_unitgroup` (`unitgroup_id`);


INSERT INTO mst_unit (`unit_id`, `unit_name`, `unitgroup_id`, `_createby`, `_createdate`) VALUES ('HBS', 'HUGOBOSS', 'MEN', 'root', NOW());
INSERT INTO mst_unit (`unit_id`, `unit_name`, `unitgroup_id`, `_createby`, `_createdate`) VALUES ('CAN', 'CANALI', 'MEN', 'root', NOW());
INSERT INTO mst_unit (`unit_id`, `unit_name`, `unitgroup_id`, `_createby`, `_createdate`) VALUES ('GEX', 'GEOX', 'MEN', 'root', NOW());
INSERT INTO mst_unit (`unit_id`, `unit_name`, `unitgroup_id`, `_createby`, `_createdate`) VALUES ('EAG', 'AIGNER', 'ACS', 'root', NOW());
INSERT INTO mst_unit (`unit_id`, `unit_name`, `unitgroup_id`, `_createby`, `_createdate`) VALUES ('FLA', 'FURLA', 'ACS', 'root', NOW());
INSERT INTO mst_unit (`unit_id`, `unit_name`, `unitgroup_id`, `_createby`, `_createdate`) VALUES ('FRG', 'FERRAGAMO', 'ACS', 'root', NOW());
INSERT INTO mst_unit (`unit_id`, `unit_name`, `unitgroup_id`, `_createby`, `_createdate`) VALUES ('FKP', 'FIND KAPOOR', 'ACS', 'root', NOW());
INSERT INTO mst_unit (`unit_id`, `unit_name`, `unitgroup_id`, `_createby`, `_createdate`) VALUES ('TOD', 'TODS', 'ACS', 'root', NOW());



