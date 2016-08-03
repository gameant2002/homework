
<?php
include("mysql_connect.inc.php");
mysql_select_db("mobile_web", $connection) or die("Could not select database");

$method=strtolower($_SERVER["REQUEST_METHOD"]);
	switch($method){
		case'get':
			$table=$_GET['table_php'];
			$modifyContextId=$_GET['modifyContextId_php'];
			
			$sqlScript = "SELECT * FROM $table WHERE id = '$modifyContextId'";
			$sqlResult = mysql_query($sqlScript) or die("Could not issue MySQL query");
			
			$return_array=array();
			while ($row=mysql_fetch_assoc($sqlResult))
			{
				array_push($return_array,$row);
			}
			$result =json_encode($return_array);			

			break;
	}
	echo $result;
?>