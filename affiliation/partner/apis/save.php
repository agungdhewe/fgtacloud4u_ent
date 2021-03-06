<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
// require_once __ROOT_DIR . "/core/sequencer.php";

use \FGTA4\exceptions\WebException;
// use \FGTA4\utils\Sequencer;



// /* Enable Debugging */
// require_once __ROOT_DIR.'/core/debug.php';
// use \FGTA4\debug;


class DataSave extends WebAPI {
	function __construct() {
		$logfilepath = __LOCALDB_DIR . "/output/partner-save.txt";
		// debug::disable();
		// debug::start($logfilepath, "w");

		$this->debugoutput = true;
		$DB_CONFIG = DB_CONFIG[$GLOBALS['MAINDB']];
		$DB_CONFIG['param'] = DB_CONFIG_PARAM[$GLOBALS['MAINDBTYPE']];
		$this->db = new \PDO(
					$DB_CONFIG['DSN'], 
					$DB_CONFIG['user'], 
					$DB_CONFIG['pass'], 
					$DB_CONFIG['param']
		);	

	}
	
	public function execute($data, $options) {
		$tablename = 'mst_partner';
		$primarykey = 'partner_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;

		$userdata = $this->auth->session_get_user();

		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "save", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$result = new \stdClass; 
			
			$key = new \stdClass;
			$obj = new \stdClass;
			foreach ($data as $fieldname => $value) {
				if ($fieldname=='_state') { continue; }
				if ($fieldname==$primarykey) {
					$key->{$fieldname} = $value;
				}
				$obj->{$fieldname} = $value;
			}

			// apabila ada tanggal, ubah ke format sql sbb:
			// $obj->tanggal = (\DateTime::createFromFormat('d/m/Y',$obj->tanggal))->format('Y-m-d');

			$obj->partner_id = strtoupper($obj->partner_id);
			$obj->partner_name = strtoupper($obj->partner_name);
			$obj->partner_addressline1 = strtoupper($obj->partner_addressline1);
			$obj->partner_addressline2 = strtoupper($obj->partner_addressline2);
			$obj->partner_postcode = strtoupper($obj->partner_postcode);
			$obj->partner_city = strtoupper($obj->partner_city);
			$obj->partner_country = strtoupper($obj->partner_country);
			$obj->partner_phone = strtoupper($obj->partner_phone);
			$obj->partner_mobilephone = strtoupper($obj->partner_mobilephone);
			$obj->partner_email = strtoupper($obj->partner_email);
			$obj->partner_parent = strtoupper($obj->partner_parent);
			$obj->partnertype_id = strtoupper($obj->partnertype_id);
			$obj->partnerorg_id = strtoupper($obj->partnerorg_id);
			$obj->empl_id = strtoupper($obj->empl_id);


			// if ($obj->partner_parent=='--NULL--') { unset($obj->partner_parent); }
			// if ($obj->empl_id=='--NULL--') { unset($obj->empl_id); }





			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				$action = '';
				if ($datastate=='NEW') {
					$action = 'NEW';
					if ($autoid) {
						$obj->{$primarykey} = $this->NewId([]);
					}
					$obj->_createby = $userdata->username;
					$obj->_createdate = date("Y-m-d H:i:s");
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
				} else {
					$action = 'MODIFY';
					$obj->_modifyby = $userdata->username;
					$obj->_modifydate = date("Y-m-d H:i:s");				
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
				}
	
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);

				$this->db->commit();
			} catch (\Exception $ex) {
				$this->db->rollBack();
				throw $ex;
			} finally {
				$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
			}


			$where = \FGTA4\utils\SqlUtility::BuildCriteria((object)[$primarykey=>$obj->{$primarykey}], [$primarykey=>"$primarykey=:$primarykey"]);
			$sql = \FGTA4\utils\SqlUtility::Select($tablename , [
				$primarykey, 'partner_id', 'partner_name', 'partner_addressline1', 'partner_addressline2', 'partner_postcode', 'partner_city', 'partner_country', 'partner_phone', 'partner_mobilephone', 'partner_email', 'partner_isdisabled', 'partner_isparent', 'partner_parent', 'partnertype_id', 'partnerorg_id', 'empl_id', '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
			], $where->sql);
			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);			

			$dataresponse = [];
			foreach ($row as $key => $value) {
				$dataresponse[$key] = $value;
			}
			$result->dataresponse = (object) array_merge($dataresponse, [
				//  untuk lookup atau modify response ditaruh disini
				'country_name' => \FGTA4\utils\SqlUtility::Lookup($data->partner_country, $this->db, 'mst_country', 'country_id', 'country_name'),
				'partner_parent_name' => \FGTA4\utils\SqlUtility::Lookup($data->partner_parent, $this->db, 'mst_partner', 'partner_id', 'partner_name'),
				'partnertype_name' => \FGTA4\utils\SqlUtility::Lookup($data->partnertype_id, $this->db, 'mst_partnertype', 'partnertype_id', 'partnertype_name'),
				'partnerorg_name' => \FGTA4\utils\SqlUtility::Lookup($data->partnerorg_id, $this->db, 'mst_partnerorg', 'partnerorg_id', 'partnerorg_name'),
				'empl_name' => \FGTA4\utils\SqlUtility::Lookup($data->empl_id, $this->db, 'mst_empl', 'empl_id', 'empl_name'),
				
			]);

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function NewId($param) {
					return uniqid();
	}

}

$API = new DataSave();