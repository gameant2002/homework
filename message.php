
<?php
include("mysql_connect.inc.php");
	
mysql_select_db("mobile_web", $connection) or die("Could not select database");

$method=strtolower($_SERVER["REQUEST_METHOD"]);

	switch($method){
		case'post':
			$loginName=$_POST['loginName_php'];
			$textarea=$_POST['textarea_php'];
			$table=$_POST['table_php'];
			if($textarea=="")
			{
				return;
			}else{
				//$sqlScript="INSERT INTO $table(username,userpassword,emailaddress) VALUES ('$loginName','$password','$email')";
				$sqlScript="INSERT INTO $table(username,messageTxt) VALUES ('$loginName','$textarea')";
				$result = mysql_query($sqlScript) or die("Could not issue MySQL query");
			}
			break;

		case'get':
			$table=$_GET['table_php'];
			//$table='marijuana_message';
			$sqlScript = "SELECT * FROM $table";
			$sqlResult = mysql_query($sqlScript) or die("Could not issue MySQL query");
			
			$return_array=array();
			while ($row=mysql_fetch_assoc($sqlResult))
			{
				array_push($return_array,$row);
			}
			echo json_encode($return_array);			
			return;

		case'put':
			parse_str(file_get_contents("php://input"),$put_vars);

			$loginName=$put_vars['loginName_php'];
			$oldPassword=$put_vars['oldPassword_php'];
			$newPassword=$put_vars['newPassword_php'];

			$sql_result = mysql_query("SELECT * from members WHERE username='$loginName' and userpassword='$oldPassword'") or die("Could not issue MySQL query");
			
			$select_rows = mysql_num_rows($sql_result);

			if($select_rows>0)
			{
				mysql_query("update members set userpassword='$newPassword' where username='$loginName'");
				$result = 1;
			}else{
				$result = 0;
			}
			break;

		case'delete':
			parse_str(file_get_contents("php://input"),$del_vars);

			$loginName=$del_vars['loginName_php'];
			$password=$del_vars['password_php'];
			$rePassword=$del_vars['rePassword_php'];
			
			$sql_result=mysql_query("SELECT * from members WHERE username='$loginName' and userpassword='$password'") or die("Could not issue MySQL query");
			$sql_result_row = mysql_num_rows($sql_result);

			if($sql_result_row>0)
			{
				$result = mysql_query("delete from members where username='$loginName'");
			}else{
				$result = 0;
			}
			break;
	}
	echo $result;
?>