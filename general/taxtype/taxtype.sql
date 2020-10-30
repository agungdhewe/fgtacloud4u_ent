CREATE TABLE `mst_taxtype` (
	`taxtype_id` varchar(10) NOT NULL , 
	`taxtype_name` varchar(30) NOT NULL , 
	`taxtype_descr` varchar(90)  , 
	`taxtype_value` decimal(4, 2) NOT NULL DEFAULT 0, 
	`taxtype_include` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `taxtype_name` (`taxtype_name`),
	PRIMARY KEY (`taxtype_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tipe Tax';




INSERT INTO mst_taxtype (`taxtype_id`, `taxtype_name`, `taxtype_value`, `_createby`, `_createdate`) VALUES ('NOTAX', 'NO TAX', '0', 'root', NOW());
INSERT INTO mst_taxtype (`taxtype_id`, `taxtype_descr`, `taxtype_name`, `taxtype_value`, `_createby`, `_createdate`) VALUES ('PPN', 'pembelian barang', 'PPN', '10', 'root', NOW());
INSERT INTO mst_taxtype (`taxtype_id`, `taxtype_name`, `taxtype_descr`, `taxtype_value`, `_createby`, `_createdate`) VALUES ('PPH2315', 'PPh 23 - 15%', 'dividen & hadiah', '15', 'root', NOW());
INSERT INTO mst_taxtype (`taxtype_id`, `taxtype_name`, `taxtype_descr`, `taxtype_value`, `_createby`, `_createdate`) VALUES ('PPH2302', 'PPh 23 - 2%', 'sewa & jasa', '2', 'root', NOW());



