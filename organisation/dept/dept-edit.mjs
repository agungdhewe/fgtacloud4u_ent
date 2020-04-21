var this_page_id;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')

const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_dept_id: $('#pnl_edit-txt_dept_id'),
	txt_dept_name: $('#pnl_edit-txt_dept_name'),
	txt_dept_descr: $('#pnl_edit-txt_dept_descr'),
	chk_dept_isdisabled: $('#pnl_edit-chk_dept_isdisabled'),
	txt_dept_path: $('#pnl_edit-txt_dept_path'),
	txt_dept_level: $('#pnl_edit-txt_dept_level'),
	cbo_deptgroup_id: $('#pnl_edit-cbo_deptgroup_id'),
	cbo_dept_parent: $('#pnl_edit-cbo_dept_parent'),
	cbo_depttype_id: $('#pnl_edit-cbo_depttype_id'),
	cbo_deptauth_id: $('#pnl_edit-cbo_deptauth_id')
}


let form = {}

export async function init(opt) {
	this_page_id = opt.id


	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_dept_id,
		autoid: false,
		logview: 'mst_dept',
		btn_edit: btn_edit,
		btn_save: btn_save,
		btn_delete: btn_delete,		
		objects : obj,
		OnDataSaving: async (data, options) => { await form_datasaving(data, options) },
		OnDataSaveError: async (data, options) => { await form_datasaveerror(data, options) },
		OnDataSaved: async (result, options) => {  await form_datasaved(result, options) },
		OnDataDeleting: async (data, options) => { await form_deleting(data, options) },
		OnDataDeleted: async (result, options) => { await form_deleted(result, options) },
		OnIdSetup : (options) => { form_idsetup(options) },
		OnViewModeChanged : (viewonly) => { form_viewmodechanged(viewonly) }
	})



	new fgta4slideselect(obj.cbo_deptgroup_id, {
		title: 'Pilih deptgroup_id',
		returnpage: this_page_id,
		api: $ui.apis.load_deptgroup_id,
		fieldValue: 'deptgroup_id',
		fieldValueMap: 'deptgroup_id',
		fieldDisplay: 'deptgroup_name',
		fields: [
			{mapping: 'deptgroup_id', text: 'deptgroup_id'},
			{mapping: 'deptgroup_name', text: 'deptgroup_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {},
		OnSelected: (value, display, record) => {
			var selected_depttype_id = obj.cbo_depttype_id.combobox('getValue');
			if (selected_depttype_id=="0") {
				// langsung isi
				form.setValue(obj.cbo_depttype_id, record.depttype_id, record.depttype_name)
			} else {
				if (record.depttype_id!=selected_depttype_id) {
					$ui.ShowMessage('[QUESTION]Apakah anda akan mengubah tipe?', {
						"Ya" : () => {
							if (record.deptgroup_id!='--NULL--') {
								form.setValue(obj.cbo_depttype_id, record.depttype_id, record.depttype_name)
							} else {
								form.setValue(obj.cbo_depttype_id, '0', '-- PILIH --')
							}
						},
						"Tidak" : () => {
						}
					});
				}
			}			
		}
	})				
				
	new fgta4slideselect(obj.cbo_dept_parent, {
		title: 'Pilih dept_parent',
		returnpage: this_page_id,
		api: $ui.apis.load_dept_parent,
		fieldValue: 'dept_parent',
		fieldValueMap: 'dept_id',
		fieldDisplay: 'dept_name',
		fields: [
			{mapping: 'dept_id', text: 'dept_id'},
			{mapping: 'dept_name', text: 'dept_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			
			// hapus pilihan yang sama dengan data saat ini
			var id = obj.txt_dept_id.textbox('getText')
			var i = 0; var idx = -1;
			for (var d of result.records) {
				if (d.dept_id==id) { idx = i; }
				i++;
			}
			if (idx>=0) { result.records.splice(idx, 1); }					
			
			result.records.unshift({dept_id:'--NULL--', dept_name:'NONE'});	
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_depttype_id, {
		title: 'Pilih depttype_id',
		returnpage: this_page_id,
		api: $ui.apis.load_depttype_id,
		fieldValue: 'depttype_id',
		fieldValueMap: 'depttype_id',
		fieldDisplay: 'depttype_name',
		fields: [
			{mapping: 'depttype_id', text: 'depttype_id'},
			{mapping: 'depttype_name', text: 'depttype_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_deptauth_id, {
		title: 'Pilih deptauth_id',
		returnpage: this_page_id,
		api: $ui.apis.load_deptauth_id,
		fieldValue: 'deptauth_id',
		fieldValueMap: 'deptauth_id',
		fieldDisplay: 'deptauth_name',
		fields: [
			{mapping: 'deptauth_id', text: 'deptauth_id'},
			{mapping: 'deptauth_name', text: 'deptauth_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
				



	document.addEventListener('keydown', (ev)=>{
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			if (ev.code=='KeyS' && ev.ctrlKey==true) {
				if (!form.isInViewMode()) {
					form.btn_save_click();
				}
				ev.stopPropagation()
				ev.preventDefault()
			}
		}
	}, true)
	
	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	

	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			if (form.isDataChanged()) {
				form.canceledit(()=>{
					$ui.getPages().show('pnl_list', ()=>{
						form.setViewMode()
						$ui.getPages().ITEMS['pnl_list'].handler.scrolllast()
					})
				})
			} else {
				$ui.getPages().show('pnl_list', ()=>{
					form.setViewMode()
					$ui.getPages().ITEMS['pnl_list'].handler.scrolllast()
				})
			}
		
		}
	})

	document.addEventListener('OnButtonHome', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			if (form.isDataChanged()) {
				ev.detail.cancel = true;
				$ui.ShowMessage('Anda masih dalam mode edit dengan pending data, silakan matikan mode edit untuk kembali ke halaman utama.')
			}
		}
	})



}


export function OnSizeRecalculated(width, height) {
}




export function open(data, rowid, viewmode=true, fn_callback) {


	var fn_dataopening = async (options) => {
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {

		if (result.record.dept_parent==null) { result.record.dept_parent='--NULL--'; result.record.dept_parent_name='NONE'; }


		form
			.fill(result.record)
			.setValue(obj.cbo_deptgroup_id, result.record.deptgroup_id, result.record.deptgroup_name)
			.setValue(obj.cbo_dept_parent, result.record.dept_parent, result.record.dept_parent_name)
			.setValue(obj.cbo_depttype_id, result.record.depttype_id, result.record.depttype_name)
			.setValue(obj.cbo_deptauth_id, result.record.deptauth_id, result.record.deptauth_name)
			.commit()
			.setViewMode(viewmode)
			.lock(false)
			.rowid = rowid

		// tampilkan form untuk data editor
		fn_callback()


		// fill data, bisa dilakukan secara manual dengan cara berikut:	
		// form
			// .setValue(obj.txt_id, result.record.id)
			// .setValue(obj.txt_nama, result.record.nama)
			// .setValue(obj.cbo_prov, result.record.prov_id, result.record.prov_nama)
			// .setValue(obj.chk_isdisabled, result.record.disabled)
			// .setValue(obj.txt_alamat, result.record.alamat)
			// ....... dst dst
			// .commit()
			// .setViewMode()
			// ....... dst dst

	}

	var fn_dataopenerror = (err) => {
		$ui.ShowMessage(err.errormessage);
	}

	form.dataload(fn_dataopening, fn_dataopened, fn_dataopenerror)
	
}


export function createnew() {
	form.createnew(async (data, options)=>{
		// console.log(data)
		// console.log(options)
		form.rowid = null

		// set nilai-nilai default untuk form
			data.dept_level = 0

			data.deptgroup_id = '0'
			data.deptgroup_name = '-- PILIH --'
			data.dept_parent = '--NULL--'
			data.dept_parent_name = 'NONE'
			data.depttype_id = '0'
			data.depttype_name = '-- PILIH --'
			data.deptauth_id = '0'
			data.deptauth_name = '-- PILIH --'



		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}



	})
}


export function detil_open(pnlname) {
	if (form.isDataChanged()) {
		$ui.ShowMessage('Simpan dulu perubahan datanya.')
		return;
	}

	//$ui.getPages().show(pnlname)
	$ui.getPages().show(pnlname, () => {
		$ui.getPages().ITEMS[pnlname].handler.OpenDetil(form.getData())
	})	
}


function form_viewmodechanged(viewmode) {
	var OnViewModeChangedEvent = new CustomEvent('OnViewModeChanged', {detail: {}})
	$ui.triggerevent(OnViewModeChangedEvent, {
		viewmode: viewmode
	})
}

function form_idsetup(options) {
	var objid = obj.txt_dept_id
	switch (options.action) {
		case 'fill' :
			objid.textbox('disable') 
			break;

		case 'createnew' :
			// console.log('new')
			if (form.autoid) {
				objid.textbox('disable') 
				objid.textbox('setText', '[AUTO]') 
			} else {
				objid.textbox('enable') 
			}
			break;
			
		case 'save' :
			objid.textbox('disable') 
			break;	
	}
}


async function form_datasaving(data, options) {
	// cek dulu data yang akan disimpan,
	// apabila belum sesuai dengan yang diharuskan, batalkan penyimpanan
	//    options.cancel = true

	// Modifikasi object data, apabila ingin menambahkan variabel yang akan dikirim ke server

	options.skipmappingresponse = ["dept_parent"];

}

async function form_datasaveerror(err, options) {
	// apabila mau olah error messagenya
	// $ui.ShowMessage(err.errormessage)
	console.log(err)
}


async function form_datasaved(result, options) {
	// Apabila tidak mau munculkan dialog
	// options.suppressdialog = true

	// Apabila ingin mengganti message Data Tersimpan
	// options.savedmessage = 'Data sudah disimpan cuy!'

	// if (form.isNewData()) {
	// 	console.log('masukan ke grid')
	// 	$ui.getPages().ITEMS['pnl_list'].handler.updategrid(form.getData())
	// } else {
	// 	console.log('update grid')
	// }


	var data = {}
	Object.assign(data, form.getData(), result.dataresponse)

	form.setValue(obj.cbo_dept_parent, result.dataresponse.dept_parent, result.dataresponse.dept_parent_name!=='--NULL--'?result.dataresponse.dept_parent_name:'NONE')

	form.rowid = $ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, form.rowid)
}



async function form_deleting(data) {
}

async function form_deleted(result, options) {
	$ui.getPages().show('pnl_list')
	$ui.getPages().ITEMS['pnl_list'].handler.removerow(form.rowid)

}

