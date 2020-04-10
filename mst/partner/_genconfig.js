'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Partner",
	autoid: true,

	persistent: {
		'mst_partner' : {
			primarykeys: ['partner_id'],
			comment: 'Daftar Partner (rekanan)',
			data: {
				partner_id: {text:'ID', type: dbtype.varchar(14), null:false, uppercase: true},
				partner_name: {text:'Name', type: dbtype.varchar(60), null:false, uppercase: true, options:{required:true,invalidMessage:'Name harus diisi'}},
				partner_addressline1: {text:'Address', type: dbtype.varchar(100), null:false, suppresslist: true, uppercase: true, options:{required:true,invalidMessage:'Alamat harus diisi'}},
				partner_addressline2: {text:'..', type: dbtype.varchar(100), null:false, uppercase: true, suppresslist: true},
				partner_postcode: {text:'..', type: dbtype.varchar(10), null:false, uppercase: true, suppresslist: true},
				partner_city: {text:'City', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'City harus diisi'}},
				partner_country: {
					text:'Country', type: dbtype.varchar(10), null:false, uppercase: true,
					options:{required:true,invalidMessage:'Country harus diisi'},
					comp: comp.Combo({
						table: 'mst_country', 
						field_value: 'country_id', field_display: 'country_name', 
						api: 'ent/mst/country/list'})					
				},
				partner_phone: {text:'Phone', type: dbtype.varchar(30), null:false, uppercase: true, suppresslist: true, options:{required:true,invalidMessage:'Phone harus diisi'},},	
				partner_mobilephone: {text:'HP', type: dbtype.varchar(30), null:false, uppercase: true, suppresslist: true},
				partner_email: {text:'Email', type: dbtype.varchar(150), null:false, uppercase: true, suppresslist: true},				
				partner_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
				partnertype_id: {
					text:'Type', type: dbtype.varchar(10), null:false, uppercase: true, 
					options:{required:true,invalidMessage:'Type harus diisi'},
					comp: comp.Combo({
						table: 'mst_partnertype', 
						field_value: 'partnertype_id', field_display: 'partnertype_name', 
						api: 'ent/mst/partnertype/list'})					
				
				},	
				partnerorg_id: {
					text:'Org', type: dbtype.varchar(10), null:false, uppercase: true, suppresslist: true,
					options:{required:true,invalidMessage:'Org harus diisi'},
					comp: comp.Combo({
						table: 'mst_partnerorg', 
						field_value: 'partnerorg_id', field_display: 'partnerorg_name', 
						api: 'ent/mst/partnerorg/list'})					
				},
			},

			defaultsearch : ['partner_id', 'partner_name'],

			uniques: {
				'partner_name' : ['partner_name']
			}
		},

		'mst_partnerbank' : {
			primarykeys: ['partnerbank_id'],
			comment: 'Daftar Bank yang dimiliki suatu Partner (rekanan)',
			data: {
				partnerbank_id: {text:'ID', type: dbtype.varchar(14), null:false, uppercase: true},
				partnerbank_accnum: {text:'Account Number', type: dbtype.varchar(30), null:false, uppercase: true},
				partnerbank_accname: {text:'Account Name', type: dbtype.varchar(90), null:false, uppercase: true},
				partnerbank_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
				bank_id: {
					text:'Bank', type: dbtype.varchar(14), null:false, uppercase: true,
					options:{required:true,invalidMessage:'Bank harus diisi'},
					comp: comp.Combo({
						table: 'mst_bank', 
						field_value: 'bank_id', field_display: 'bank_name', 
						api: 'ent/mst/bank/list'})
			
				},
				partner_id: {text:'Partner', type: dbtype.varchar(14), null:false, uppercase: true},
			},
			uniques: {
				'partnerbank_accnum' : ['partner_id', 'partnerbank_accnum']
			}			
		},

		'mst_partnercontact' : {
			primarykeys: ['partnercontact_id'],
			comment: 'Daftar kontak yang dimiliki suatu Partner (rekanan)',
			data: {
				partnercontact_id: {text:'ID', type: dbtype.varchar(14), null:false, uppercase: true},
				partnercontact_name: {text:'Name', type: dbtype.varchar(100), null:false, uppercase: true, options:{required:true,invalidMessage:'Name harus diisi'}},
				partnercontact_position: {text:'Position', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'Position harus diisi'}},
				partnercontact_mobilephone: {text:'HP', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'HP harus diisi'}},
				partnercontact_email: {text:'Email', type: dbtype.varchar(150), null:false, uppercase: true, options:{required:true,validType: ['email'],invalidMessage:'Email harus diisi'}},
				partnecontact_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
				partner_id: {text:'Partner', type: dbtype.varchar(14), null:false, uppercase: true},
			},
			uniques: {
				'partnercontact_mobilephone' : ['partner_id', 'partnercontact_mobilephone']
			}			
		}
	},

	schema: {
		title: 'Partner',
		header: 'mst_partner',
		detils: {
			'bank' : {title: 'Bank', table:'mst_partnerbank', form: true, headerview:'partner_name'},
			'contact' : {title: 'Contact', table:'mst_partnercontact', form: true, headerview:'partner_name'},
		}
	}
}

