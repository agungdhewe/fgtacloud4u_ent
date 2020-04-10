CREATE TABLE `mst_brand` (
	`brand_id` varchar(10) NOT NULL , 
	`brand_name` varchar(60) NOT NULL , 
	`brand_descr` varchar(90)  , 
	`brand_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`brand_grouping01` varchar(60)  , 
	`brand_grouping02` varchar(60)  , 
	`brandtype_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `brand_name` (`brand_name`),
	PRIMARY KEY (`brand_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Brand';

ALTER TABLE `mst_brand` ADD KEY `brandtype_id` (`brandtype_id`);

ALTER TABLE `mst_brand` ADD CONSTRAINT `fk_mst_brand_mst_brandtype` FOREIGN KEY (`brandtype_id`) REFERENCES `mst_brandtype` (`brandtype_id`);


INSERT INTO mst_brand (`brand_id`, `brand_name`, `brandtype_id`, `_createby`, `_createdate`) VALUES ('HBS', 'HUGOBOSS', 'MEN', 'root', NOW());
INSERT INTO mst_brand (`brand_id`, `brand_name`, `brandtype_id`, `_createby`, `_createdate`) VALUES ('CAN', 'CANALI', 'MEN', 'root', NOW());
INSERT INTO mst_brand (`brand_id`, `brand_name`, `brandtype_id`, `_createby`, `_createdate`) VALUES ('GEX', 'GEOX', 'MEN', 'root', NOW());
INSERT INTO mst_brand (`brand_id`, `brand_name`, `brandtype_id`, `_createby`, `_createdate`) VALUES ('EAG', 'AIGNER', 'ACS', 'root', NOW());
INSERT INTO mst_brand (`brand_id`, `brand_name`, `brandtype_id`, `_createby`, `_createdate`) VALUES ('FLA', 'FURLA', 'ACS', 'root', NOW());
INSERT INTO mst_brand (`brand_id`, `brand_name`, `brandtype_id`, `_createby`, `_createdate`) VALUES ('FRG', 'FERRAGAMO', 'ACS', 'root', NOW());
INSERT INTO mst_brand (`brand_id`, `brand_name`, `brandtype_id`, `_createby`, `_createdate`) VALUES ('FKP', 'FIND KAPOOR', 'ACS', 'root', NOW());
INSERT INTO mst_brand (`brand_id`, `brand_name`, `brandtype_id`, `_createby`, `_createdate`) VALUES ('TOD', 'TODS', 'ACS', 'root', NOW());



CREATE TABLE `mst_brandpartner` (
	`brandpartner_id` varchar(14) NOT NULL , 
	`partner_id` varchar(14) NOT NULL , 
	`brand_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `brandpartner_name` (`brand_id`, `partner_id`),
	PRIMARY KEY (`brandpartner_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Partner Brand';

ALTER TABLE `mst_brandpartner` ADD KEY `partner_id` (`partner_id`);
ALTER TABLE `mst_brandpartner` ADD KEY `brand_id` (`brand_id`);

ALTER TABLE `mst_brandpartner` ADD CONSTRAINT `fk_mst_brandpartner_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `mst_brandpartner` ADD CONSTRAINT `fk_mst_brandpartner_mst_brand` FOREIGN KEY (`brand_id`) REFERENCES `mst_brand` (`brand_id`);





