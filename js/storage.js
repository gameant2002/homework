function modifyAccountMenu(modifyLoginGurst_id,modifyLoginUser_id) {

	var loginName_val = localStorage.getItem("loginName");
	if(loginName_val!=null)
	{
		document.getElementById(modifyLoginGurst_id).style.display="none";
		document.getElementById(modifyLoginUser_id).style.display="block";
	}else{
		document.getElementById(modifyLoginUser_id).style.display="none";
		document.getElementById(modifyLoginGurst_id).style.display="block";
	}
}

function RemoveItem() {
	var name = document.forms.ShoppingList.name.value;
	document.forms.ShoppingList.data.value = localStorage.removeItem(name);
}

/*
<div class="message-box"></div>
$(".message-box").hide();
$(".message-box").show().html("Del success");
*/
function ClearAll()
{
	if (localStorage.length >0)
	{
		var loginName_val = localStorage.getItem("loginName");
		localStorage.clear();
		alert("Logout Finish");
	}
}

function setModifyContextId(favoritesLink_id)
{
	localStorage.setItem("modifyContextId", favoritesLink_id);
}
