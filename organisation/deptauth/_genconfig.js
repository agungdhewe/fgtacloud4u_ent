
'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Departement Auth",
	autoid: false,

	persistent: {
		'mst_deptauth' : {
			primarykeys: ['deptauth_id'],
			comment: 'Daftar Authorisasi Departement',
			data: {
				deptauth_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				deptauth_name: {text:'Auth Name', type: dbtype.varchar(60), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Authorisasi harus diisi'}},
				deptauth_descr: {text:'Descr', type: dbtype.varchar(90), null:true, uppercase: false, suppresslist: true},
				
				//TODO Buat modul HRMS, relasikan empl_id ke table mst_empl
				empl_id: {
					text:'Empl', type: dbtype.varchar(10), null:true, 
					comp: comp.Combo({
						table: 'mst_empl', 
						field_value: 'empl_id', field_display: 'empl_name', 
						api: 'hrms/hr/empl/list'})
				}	

			},

			defaultsearch: ['deptauth_id', 'deptauth_name'],

			uniques: {
				'deptauth_name' : ['deptauth_name']
			}
			
		},

	},

	schema: {
		title: 'Department Auth',
		header: 'mst_deptauth',
		detils: {}
	}

}
