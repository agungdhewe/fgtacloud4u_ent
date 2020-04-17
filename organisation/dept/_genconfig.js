
'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Departement",
	autoid: false,

	persistent: {
		'mst_dept' : {
			primarykeys: ['dept_id'],
			comment: 'Daftar Departement',
			data: {
				dept_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true, options:{required:true,invalidMessage:'ID Group harus diisi'}},
				dept_name: {text:'Dept Name', type: dbtype.varchar(60), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Group harus diisi'}},
				dept_descr: {text:'Descr', type: dbtype.varchar(90), null:true, uppercase: false, suppresslist: true},
				dept_path: {text:'Path', type: dbtype.varchar(390), null:false, uppercase: false, suppresslist: true, options:{disabled:true}},
				dept_level: {text:'Level', type: dbtype.int(2), null:false, default:'0', uppercase: false, suppresslist: true, options:{disabled:true}},
				depttype_id: {
					text:'Type', type: dbtype.varchar(10), null:false, uppercase: true, suppresslist: true,
					options:{required:true,invalidMessage:'Type Group harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_depttype', 
						field_value: 'depttype_id', field_display: 'depttype_name', 
						api: 'ent/organisation/depttype/list'})				
				},
			},

			defaultsearch: ['deptgroup_id', 'deptgroup_name'],

			uniques: {
				'deptgroup_name' : ['deptgroup_name'],
				'deptgroup_path' : ['deptgroup_path', 'deptgroup_pathid'],
            }
			
		},

	},

	schema: {
		title: 'Department Group',
		header: 'mst_deptgroup',
		detils: {}
	}
}
