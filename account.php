
<?php
include("mysql_connect.inc.php");
mysql_select_db("mobile_web", $connection) or die("Could not select database");

$method=strtolower($_SERVER["REQUEST_METHOD"]);
	switch($method){
		case'post':
			$loginName=$_POST['loginName_php'];
			$password=$_POST['password_php'];
			$rePassword=$_POST['rePassword_php'];
			$email=$_POST['email_php'];
			if($loginName==""||$password==""||$rePassword==""||$email=="")
			{
				$result="Please enter Login Name, Password, Retype Password and Email ";
				echo $result;
				return;
			}else{
				$checkReplyNameSqlScript = "SELECT username FROM members WHERE username = '$loginName'";
				$checkReplyNameResult = mysql_query($checkReplyNameSqlScript) or die("Could not issue MySQL query");
				
				$replyName_rows = mysql_num_rows($checkReplyNameResult);
				if($replyName_rows>0)
				{
					$result="Login name reply";
					echo $result;
					return;
				}else{
					
					if($password==$rePassword)
					{
						$sqlScript="INSERT INTO members(username,userpassword,emailaddress) VALUES ('$loginName','$password','$email')";
						$result = mysql_query($sqlScript) or die("Could not issue MySQL query");
					}else{
						$result="Please enter same Password and Retype Password.";
						echo $result;
						return;
					}
				}
			}
			break;

		case'get':
			$loginName=$_GET['loginName_php'];
			$password=$_GET['password_php'];
			if($loginName==""||$password=="")
			{
				$result=2;
				echo $result;
				return;
			}else{
				$sqlScript = "SELECT username, userpassword, admin FROM members WHERE username = '$loginName' and userpassword='$password'";
				$sqlResult = mysql_query($sqlScript) or die("Could not issue MySQL query");

				while($sqlResultRow = mysql_fetch_assoc($sqlResult))
				{
					if ($sqlResultRow['username']!="")
					{
						$result =json_encode($sqlResultRow);
					}
					else
					{
						$result =0;
					}
				}
			}
			break;

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