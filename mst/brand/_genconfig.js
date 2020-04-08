'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Brand",
	autoid: false,

	persistent: {
		'mst_brand' : {
			primarykeys: ['brand_id'],
			comment: 'Daftar Brand',
			data: {
				brand_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true},
				brand_name: {text:'Brand', type: dbtype.varchar(60), null:false, uppercase: true},
				brand_descr: {text:'Descr', type: dbtype.varchar(90), null:false, suppresslist: true},
				brand_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'}				
			},
			uniques: {
				'brand_name' : ['brand_name']
			}
		},
	},

	schema: {
		title: 'Brand',
		header: 'mst_brand',
		detils: {}
	}
}



