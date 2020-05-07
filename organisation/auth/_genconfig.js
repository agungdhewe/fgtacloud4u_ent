
'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Authorisasi",
	autoid: false,

	persistent: {
		'mst_auth' : {
			primarykeys: ['auth_id'],
			comment: 'Daftar Authorisasi',
			data: {
				auth_id: {text:'ID', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				auth_name: {text:'Auth Name', type: dbtype.varchar(60), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Authorisasi harus diisi'}},
				auth_descr: {text:'Descr', type: dbtype.varchar(90), null:true, uppercase: false, suppresslist: true},
				
				//TODO Buat modul HRMS, relasikan empl_id ke table mst_empl
				empl_id: {
					text:'Empl', type: dbtype.varchar(14), null:true, uppercase: true,
					options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_empl', 
						field_value: 'empl_id', field_display: 'empl_name', 
						api: 'hrms/hr/empl/list'})
				}	

			},

			defaultsearch: ['auth_id', 'auth_name'],

			uniques: {
				'auth_name' : ['auth_name']
			}
			
		},

	},

	schema: {
		title: 'Authorisasi',
		header: 'mst_auth',
		detils: {}
	}

}
