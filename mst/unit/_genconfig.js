'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Unit",
	autoid: false,

	persistent: {
		'mst_unit' : {
			primarykeys: ['unit_id'],
			comment: 'Daftar Unit',
			data: {
				unit_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true},
				unit_name: {text:'Unit', type: dbtype.varchar(60), null:false, uppercase: true},
				unit_descr: {text:'Descr', type: dbtype.varchar(90), null:false, suppresslist: true},
				unit_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
				unitgroup_id: {
					text:'Unit Group', type: dbtype.varchar(10), null:false, 
					comp: comp.Combo({
						table: 'mst_unitgroup', 
						field_value: 'unitgroup_id', field_display: 'unitgroup_name', 
						api: 'ent/mst/unitgroup/list'})
				}				
			},
			uniques: {
				'unit_name' : ['unit_name']
			}
		},
	},

	schema: {
		title: 'Unit',
		header: 'mst_unit',
		detils: {}
	}
}



