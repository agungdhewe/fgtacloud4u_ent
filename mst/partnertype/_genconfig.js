'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Partner Type",
	autoid: false,

	persistent: {
		'mst_partnertype' : {
			primarykeys: ['partnertype_id'],
			comment: 'Daftar Tipe Partner',
			data: {
				partnertype_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true},
				partnertype_name: {text:'Partner Type', type: dbtype.varchar(60), null:false, uppercase: true},
				partnertype_descr: {text:'Descr', type: dbtype.varchar(90), null:false, uppercase: false, suppresslist: true},
				partnertype_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'}				
			},
			uniques: {
				'partnertype_name' : ['partnertype_name']
			}
		},
	},

	schema: {
		title: 'Partner Type',
		header: 'mst_partnertype',
		detils: {}
	}
}

