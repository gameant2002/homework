
<?php
include("mysql_connect.inc.php");
mysql_select_db("mobile_web", $connection) or die("Could not select database");

$method=strtolower($_SERVER["REQUEST_METHOD"]);
	switch($method){
		case'post':
			$url=$_POST['url_php'];
			$loginName=$_POST['loginName_php'];
			if($url=="")
			{
				$result="url have some mistake";
				echo $result;
				return;
			}else{
				$sqlScript="INSERT INTO favorites_list(username,url) VALUES ('$loginName','$url')";
				$result = mysql_query($sqlScript) or die("Could not issue MySQL query");
			}
			break;

		case'get':
			$table=$_GET['table_php'];
			$loginName=$_GET['loginName_php'];
			
			$sqlScript = "SELECT * FROM $table WHERE username = '$loginName'";
			$sqlResult = mysql_query($sqlScript) or die("Could not issue MySQL query");
			
			$return_array=array();
			while ($row=mysql_fetch_assoc($sqlResult))
			{
				array_push($return_array,$row);
			}
			$result = json_encode($return_array);			

			break;

		case'put':
			parse_str(file_get_contents("php://input"),$put_vars);

			$table=$put_vars['table_php'];
			$modifyContextId=$put_vars['modifyContextId_php'];
			$newContext=$put_vars['newContext_php'];
			
			$sql_result = mysql_query("SELECT * FROM $table WHERE id = '$modifyContextId'") or die("Could not issue MySQL query");
			$select_rows = mysql_num_rows($sql_result);

			if($select_rows>0)
			{
				mysql_query("update $table set context='$newContext' where id='$modifyContextId'");
				$result = 1;
			}else{
				$result = 0;
			}
			break;
			
			break;

		case'delete':
			parse_str(file_get_contents("php://input"),$del_vars);

			$table=$del_vars['table_php'];
			$modifyContextId=$del_vars['modifyContextId_php'];
			
			$result = mysql_query("delete from $table where id='$modifyContextId'");

			break;
	}
	echo $result;
?>