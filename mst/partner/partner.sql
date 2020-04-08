CREATE TABLE `mst_partner` (
	`partner_id` varchar(14) NOT NULL , 
	`partner_name` varchar(60) NOT NULL , 
	`partner_addressline1` varchar(100) NOT NULL , 
	`partner_addressline2` varchar(100) NOT NULL , 
	`partner_postcode` varchar(10) NOT NULL , 
	`partner_city` varchar(30) NOT NULL , 
	`partner_country` varchar(10) NOT NULL , 
	`partner_phone` varchar(30) NOT NULL , 
	`partner_mobilephone` varchar(30) NOT NULL , 
	`partner_email` varchar(150) NOT NULL , 
	`partner_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`partnertype_id` varchar(10) NOT NULL , 
	`partnerorg_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `partner_name` (`partner_name`),
	PRIMARY KEY (`partner_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Partner (rekanan)';

ALTER TABLE `mst_partner` ADD KEY `partner_country` (`partner_country`);
ALTER TABLE `mst_partner` ADD KEY `partnertype_id` (`partnertype_id`);
ALTER TABLE `mst_partner` ADD KEY `partnerorg_id` (`partnerorg_id`);

ALTER TABLE `mst_partner` ADD CONSTRAINT `fk_mst_partner_mst_country` FOREIGN KEY (`partner_country`) REFERENCES `mst_country` (`country_id`);
ALTER TABLE `mst_partner` ADD CONSTRAINT `fk_mst_partner_mst_partnertype` FOREIGN KEY (`partnertype_id`) REFERENCES `mst_partnertype` (`partnertype_id`);
ALTER TABLE `mst_partner` ADD CONSTRAINT `fk_mst_partner_mst_partnerorg` FOREIGN KEY (`partnerorg_id`) REFERENCES `mst_partnerorg` (`partnerorg_id`);





CREATE TABLE `mst_partnerbank` (
	`partnerbank_id` varchar(14) NOT NULL , 
	`partnerbank_accnum` varchar(30) NOT NULL , 
	`partnerbank_accname` varchar(90) NOT NULL , 
	`partnerbank_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`bank_id` varchar(14) NOT NULL , 
	`partner_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `partnerbank_accnum` (`partner_id`, `partnerbank_accnum`),
	PRIMARY KEY (`partnerbank_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Bank yang dimiliki suatu Partner (rekanan)';

ALTER TABLE `mst_partnerbank` ADD KEY `bank_id` (`bank_id`);
ALTER TABLE `mst_partnerbank` ADD KEY `partner_id` (`partner_id`);

ALTER TABLE `mst_partnerbank` ADD CONSTRAINT `fk_mst_partnerbank_mst_bank` FOREIGN KEY (`bank_id`) REFERENCES `mst_bank` (`bank_id`);
ALTER TABLE `mst_partnerbank` ADD CONSTRAINT `fk_mst_partnerbank_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);





CREATE TABLE `mst_partnercontact` (
	`partnercontact_id` varchar(14) NOT NULL , 
	`partnercontact_name` varchar(100) NOT NULL , 
	`partnercontact_position` varchar(30) NOT NULL , 
	`partnercontact_mobilephone` varchar(30) NOT NULL , 
	`partnercontact_email` varchar(150) NOT NULL , 
	`partnecontact_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`partner_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `partnercontact_mobilephone` (`partner_id`, `partnercontact_mobilephone`),
	PRIMARY KEY (`partnercontact_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar kontak yang dimiliki suatu Partner (rekanan)';

ALTER TABLE `mst_partnercontact` ADD KEY `partner_id` (`partner_id`);

ALTER TABLE `mst_partnercontact` ADD CONSTRAINT `fk_mst_partnercontact_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);





