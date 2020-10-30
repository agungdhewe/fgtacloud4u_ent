'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Config",
	autoid: false,

	persistent: {
		'mst_config' : {
			primarykeys: ['config_id'],
			comment: 'Daftar Config',
			data: {
				config_id: {text:'ID', type: dbtype.varchar(30), null:false, uppercase: true},
				config_name: {text:'Config', type: dbtype.varchar(30), null:false, uppercase: true}	,
				config_dir: {text:'Directory', type: dbtype.varchar(100), null:false},
				config_filename: {text:'File', type: dbtype.varchar(100), null:false},			
			},

			defaultsearch : ['config_id', 'config_name'],

			uniques: {
				'config_name' : ['config_name']
			}
		},
	},

	schema: {
		title: 'Config',
		header: 'mst_config',
		detils: {}
	}
}



