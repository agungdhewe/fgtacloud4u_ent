CREATE TABLE `mst_partnertype` (
	`partnertype_id` varchar(10) NOT NULL , 
	`partnertype_name` varchar(60) NOT NULL , 
	`partnertype_descr` varchar(90) NOT NULL , 
	`partnertype_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `partnertype_name` (`partnertype_name`),
	PRIMARY KEY (`partnertype_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tipe Partner';





