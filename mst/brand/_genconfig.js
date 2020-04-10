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
				brand_descr: {text:'Descr', type: dbtype.varchar(90), null:true, suppresslist: true},
				brand_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
				brand_grouping01: {text:'Grouping 01', type: dbtype.varchar(60), null:true, uppercase: true, suppresslist: true},
				brand_grouping02: {text:'Grouping 02', type: dbtype.varchar(60), null:true, uppercase: true, suppresslist: true},	
				brandtype_id: {
					text:'Type', type: dbtype.varchar(10), null:false, uppercase: true, 
					options:{required:true,invalidMessage:'Type harus diisi'},
					comp: comp.Combo({
						table: 'mst_brandtype', 
						field_value: 'brandtype_id', field_display: 'brandtype_name', 
						api: 'ent/mst/brandtype/list'})					
				
				},
				unit_id: {
					text:'Unit', type: dbtype.varchar(10), null:false, uppercase: true, 
					options:{required:true,invalidMessage:'Unit harus diisi'},
					comp: comp.Combo({
						table: 'mst_unit', 
						field_value: 'unit_id', field_display: 'unit_name', 
						api: 'ent/mst/unit/list'})					
				
				}				
			},

			values: [
				{brand_id:'HBS', brand_name:'HUGOBOSS', brandtype_id:'MEN', unit_id:'HBS'},
				{brand_id:'CAN', brand_name:'CANALI', brandtype_id:'MEN', unit_id:'CAN'},
				{brand_id:'GEX', brand_name:'GEOX', brandtype_id:'MEN', unit_id:'GEX'},
				{brand_id:'EAG', brand_name:'AIGNER', brandtype_id:'ACS', unit_id:'EAG'},
				{brand_id:'FLA', brand_name:'FURLA', brandtype_id:'ACS', unit_id:'FLA'},
				{brand_id:'FRG', brand_name:'FERRAGAMO', brandtype_id:'ACS', unit_id:'FRG'},
				{brand_id:'FKP', brand_name:'FIND KAPOOR', brandtype_id:'ACS', unit_id:'FKP'},
				{brand_id:'TOD', brand_name:'TODS', brandtype_id:'ACS', unit_id:'TOD'},
			],

			uniques: {
				'brand_name' : ['brand_name']
			}
		},

		'mst_brandpartner' : {
			primarykeys: ['brandpartner_id'],
			comment: 'Daftar Partner Brand',
			data: {
				brandpartner_id: {text:'ID', type: dbtype.varchar(14), null:false, uppercase: true, suppresslist: true},
				partner_id: {
					text:'Partner', type: dbtype.varchar(14), null:false, uppercase: true,
					options:{required:true,invalidMessage:'Partner harus diisi'},
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name', 
						api: 'ent/mst/partner/list'})
			
				},
				brand_id: {text:'Brand', type: dbtype.varchar(14), null:false, uppercase: true},				
			},

			uniques: {
				'brandpartner_name' : ['brand_id', 'partner_id']
			}
		}
	},

	schema: {
		title: 'Brand',
		header: 'mst_brand',
		detils: {
			'partner' : {title: 'Partners', table:'mst_brandpartner', form: true, headerview:'brand_name'},
		}
	}
}



