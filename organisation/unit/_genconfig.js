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
				unit_descr: {text:'Descr', type: dbtype.varchar(90), null:true, suppresslist: true},
				unit_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
				unitgroup_id: {
					text:'Unit Group', type: dbtype.varchar(10), null:false, 
					comp: comp.Combo({
						table: 'mst_unitgroup', 
						field_value: 'unitgroup_id', field_display: 'unitgroup_name', 
						api: 'ent/organisation/unitgroup/list'})
				}				
			},
			uniques: {
				'unit_name' : ['unit_name']
			},

			values: [
				{unit_id:'HBS', unit_name:'HUGOBOSS', unitgroup_id:'MEN'},
				{unit_id:'CAN', unit_name:'CANALI', unitgroup_id:'MEN'},
				{unit_id:'GEX', unit_name:'GEOX', unitgroup_id:'MEN'},
				{unit_id:'EAG', unit_name:'AIGNER', unitgroup_id:'ACS'},
				{unit_id:'FLA', unit_name:'FURLA', unitgroup_id:'ACS'},
				{unit_id:'FRG', unit_name:'FERRAGAMO', unitgroup_id:'ACS'},
				{unit_id:'FKP', unit_name:'FIND KAPOOR', unitgroup_id:'ACS'},
				{unit_id:'TOD', unit_name:'TODS', unitgroup_id:'ACS'},
			],			
		},
	},

	schema: {
		title: 'Unit',
		header: 'mst_unit',
		detils: {}
	}
}



