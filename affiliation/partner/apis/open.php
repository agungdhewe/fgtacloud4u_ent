<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';


use \FGTA4\exceptions\WebException;



class DataOpen extends WebAPI {
	function __construct() {
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
	
	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "open", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"partner_id" => " partner_id = :partner_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('mst_partner', [
				'partner_id', 'partner_name', 'partner_addressline1', 'partner_addressline2', 'partner_postcode', 'partner_city', 'partner_country', 'partner_phone', 'partner_mobilephone', 'partner_email', 'partner_isdisabled', 'partner_isparent', 'partner_parent', 'partnertype_id', 'partnerorg_id', 'empl_id', '_createby', '_createdate', '_modifyby', '_modifydate' 
			], $where->sql);

			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}

			$result->record = array_merge($record, [
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				
				'country_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_country'], $this->db, 'mst_country', 'country_id', 'country_name'),
				'partner_parent_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_parent'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
				'partnertype_name' => \FGTA4\utils\SqlUtility::Lookup($record['partnertype_id'], $this->db, 'mst_partnertype', 'partnertype_id', 'partnertype_name'),
				'partnerorg_name' => \FGTA4\utils\SqlUtility::Lookup($record['partnerorg_id'], $this->db, 'mst_partnerorg', 'partnerorg_id', 'partnerorg_name'),
				'empl_name' => \FGTA4\utils\SqlUtility::Lookup($record['empl_id'], $this->db, 'mst_empl', 'empl_id', 'empl_name'),

				'_createby_username' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby_username' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

			]);

			// $date = DateTime::createFromFormat('d/m/Y', "24/04/2012");
			// echo $date->format('Y-m-d');

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

}

$API = new DataOpen();