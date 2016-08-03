$(document)
	.on('pagecreate', '#registerPage', function()
		{
			$("#registerSubmit").on('click',function() 
				{
					var phpUrl="account_edit";
					
					var loginName_val=$("#loginName_textbox").val();
					var password_val=$("#password_textbox").val();
					var rePassword_val=$("#rePassword_textbox").val();
					var email_val=$("#email_textbox").val();
					var passData = "loginName_php="+ loginName_val + "&password_php=" + password_val + "&rePassword_php=" + rePassword_val + "&email_php=" + email_val;
					$.ajax(
						{
							//async: false,
							url: phpUrl,
							data: passData,
							type:"POST",
							dataType:'text',
							success: function(msg)
							{
								if (msg==1)
								{
									alert("register finish");
									window.location.assign("login");
								}else{
									alert(msg);
								}
							},
							error:function(xhr, ajaxOptions, thrownError, msg)
							{
								alert(xhr.status);
								alert(thrownError);
								location.reload();
							}
						}
					);
				}
			);
		}
	)
	.on('pagecreate', '#loginPage', function()
		{
			$("#loginSubmit").on('click',function() 
				{
					var phpUrl="account_edit";
			  
					var loginName_val=$("#loginName_textbox").val();
					var password_val=$("#password_textbox").val();
					var passData = "loginName_php="+ loginName_val + "&password_php=" + password_val; 

					$.ajax(
						{
							//async: false,
							url: phpUrl,
							data: passData,
							type:"GET",
							dataType:'text',
							success: function(msg)
							{
								if(msg!=0 && msg!=2)
								{
									alert("Login Finish");
									var obj =$.parseJSON(msg);

									var admin =obj.admin;
									var loginName =obj.username;

									//var loginName = document.forms.loginForm.loginName.value;
									localStorage.setItem("loginName", loginName);
									localStorage.setItem("admin", admin);
	
									window.location.assign("index");
								}else if(msg==0){
									alert("Wrong Login name or wrong Password.");
								}else if(msg==2)
									alert("Please enter Login Name and Password.");
							},
							error:function(xhr, ajaxOptions, thrownError)
							{
								alert(xhr.status);
								alert(thrownError);
								location.reload();
							}
						}
					);
				}
			);
		}
	)
	.on('pagecreate', '#modifyPage', function()
		{
			$("#modifySubmit").on('click',function() 
				{
					var phpUrl="account_edit";
					
					var loginName_val=$("#loginName_textbox").val();
					var oldPassword_val=$("#oldPassword_textbox").val();
					var newPassword_val=$("#newPassword_textbox").val();

					var passData = "loginName_php="+ loginName_val + "&oldPassword_php=" + oldPassword_val + "&newPassword_php=" + newPassword_val;
					$.ajax(
						{
							//async: false,
							url: phpUrl,
							data: passData,
							type:"PUT",
							dataType:'text',
							success: function(msg)
							{
								if (msg==1)
								{
									alert("Account modify finish");
									window.location.assign("index");
								}else{
									alert("Wrong password can't modify.");
								}
							},
							error:function(xhr, ajaxOptions, thrownError)
							{
								alert(xhr.status);
								alert(thrownError);
								location.reload();
							}
						}
					);
				}
			);
		}
	)
	.on('pagecreate', '#deletePage', function()
		{
			$("#deleteSubmit").on('click',function() 
				{
					var phpUrl="account_edit";
			  
					var loginName_val=$("#loginName_textbox").val();
					var password_val=$("#password_textbox").val();
					var rePassword_val=$("#rePassword_textbox").val();
					var passData = "loginName_php="+ loginName_val + "&password_php=" + password_val + "&rePassword_php=" + rePassword_val;

					$.ajax(
						{
							//async: false,
							url: phpUrl,
							data: passData,
							type:"DELETE",
							dataType:'text',
							success: function(msg)
							{
								if (msg==1)
								{
									alert("Account del. ");
									ClearAll();
									window.location.assign("index");
								}else{
									alert("del_error.");
								}
							},
							error:function(xhr, ajaxOptions, thrownError)
							{
								alert(xhr.status);
								alert(thrownError);
								location.reload();
							}
						}
					);
				}
			);
		}
	)
	.on('click','#replySubmit',function() 
		{
			var phpUrl="message";
			
			var loginName_val = localStorage.getItem("loginName");
			
			var textarea_val=$("#marijuana_textarea").val();
			var table_val="marijuana_message";
			var passData = "textarea_php="+ textarea_val + "&table_php=" + table_val+ "&loginName_php="+loginName_val;
			$.ajax(
				{
					//async: false,
					url: phpUrl,
					data: passData,
					type:"POST",
					dataType:'text',
					success: function(msg)
					{
						if (msg==1)
						{
							alert("finish");
							window.location.assign("marijuanaPage.html");
						}else{
							alert(msg);
						}
					},
					error:function(xhr, ajaxOptions, thrownError, msg)
					{
						alert(xhr.status);
						alert(thrownError);
						location.reload();
					}
				}
			);
		}
	)
	.on('pagecreate', '#marijuanaPage', function()
		{
			var phpUrl="message";
	  
			var table_val="marijuana_message";
			var passData = "table_php=" + table_val;

			$.ajax(
				{
					//async: false,
					url: phpUrl,
					data: passData,
					type:"GET",
					dataType:'text',
					success: function(msg)
					{ 	
						var messageAreaScript = '';
						if(msg)
						{
							var obj =$.parseJSON(msg);
							$.each(obj,
								function()
								{
									messageAreaScript +='<table border="1" bgcolor="#dddddd" style="width:100%">'+
															'<tr>'+
																'<th style="width:10%" height="10">NO.'+this["id"]+'</th>'+
																'<th style="width:90%" >Published on : '+this["date"]+'</th>'+
															'</tr>'+
															'<tr>'+
																'<td id="message_user" valign="top" height="100"> Username:</br>'+this["username"]+'</td>'+
																'<td id="message_txt" valign="top" bgcolor="#ffffff">'+this["messageTxt"]+'</td>'+
															'</tr>'+
														'</table>';

								}
							);
							if(messageAreaScript=="")
							{
								messageAreaScript="<h1>Please leave a message.</h1>";
							}
						}
						$("#messageArea").html(messageAreaScript);
					},
					error:function(xhr, ajaxOptions, thrownError)
					{
						alert(xhr.status);
						alert(thrownError);
						location.reload();
					}
				}
			);
		}
	)
	.on('click','#favoriteSubmit',function() 
		{
			var loginName_val = localStorage.getItem("loginName");
			if(loginName_val!=null)
			{
				var phpUrl="favorites_edit"

				var loginName_val = localStorage.getItem("loginName");
				var url_val=window.location.href;
				var passData = "url_php="+ url_val+"&loginName_php="+loginName_val;

				$.ajax(
					{
						//async: false,
						url: phpUrl,
						data: passData,
						type:"POST",
						dataType:'text',
						success: function(msg)
						{
							if (msg==1)
							{
								alert("Favorites Page Saved");
							}else{
								alert(msg);
							}
						},
						error:function(xhr, ajaxOptions, thrownError)
						{
							alert(xhr.status);
							alert(thrownError);
							location.reload();
						}
					}
				);
			}else{
				alert("please login first");
			}
		}
	)
	.on('pagecreate', '#favorites', function()
		{
			var phpUrl="favorites_edit"
	  
			var table_val="favorites_list";
			var loginName_val = localStorage.getItem("loginName");
			var passData = "table_php=" + table_val + "&loginName_php=" + loginName_val;

			$.ajax(
				{
					//async: false,
					url: phpUrl,
					data: passData,
					type:"GET",
					dataType:'text',
					success: function(msg)
					{					
						var favoritesAreaScript = '';
						var popupModifyContextAreaScript = '';
						if(msg!="")
						{
							var obj =$.parseJSON(msg);
							$.each(obj,
								function()
								{
									favoritesAreaScript +=	'<table border="0" style="width:100%">'+
																'<tr>'+
																	'<th style="width:20%" height="10">LINK:</th>'+
																	'<th style="width:80%" align="left"><a href="'+this["url"]+'">'+this["url"]+'</a></th>'+
																'</tr>'+
																'<tr>'+
																	'<th valign="top" height="50">Content:</th>'+
																	'<td valign="top" align="left">'+this["context"]+'</td>'+
																'</tr>'+
																'<tr>'+
																	'<td valign="top" height="10"</td>'+
																	'<td valign="top" align="left">'+
																		'<a href="modifyContextPage.html" onclick="setModifyContextId('+this["id"]+')" class="ui-btn ui-mini">modify context</a>'+
																	'</td>'+
																'</tr>'+
															'</table>';
								}
							);
							if(favoritesAreaScript=="")
							{
								favoritesAreaScript = "<h1>No Favorites List.</h1>";
							}
						}
						$("#favoritesArea").html(favoritesAreaScript);
					},
					error:function(xhr, ajaxOptions, thrownError)
					{
						alert(xhr.status);
						alert(thrownError);
						location.reload();
					}
				}
			);
		}
	)
	.on('pagecreate', '#modifyContextPage', function()
		{
			var phpUrl="favorites_show";
			
			var modifyContextId_val = localStorage.getItem("modifyContextId");
			var table_val="favorites_list";
			var passData = "table_php=" + table_val + "&modifyContextId_php=" + modifyContextId_val;

			$.ajax(
				{
					//async: false,
					url: phpUrl,
					data: passData,
					type:"GET",
					dataType:'text',
					success: function(msg)
					{						
						var modifyFavoritesLinkAreaScript = '';
						if(msg!="")
						{
							var obj =$.parseJSON(msg);
							
							$.each(obj,
								function()
								{
									modifyFavoritesLinkAreaScript +=	'<table border="0" style="width:100%">'+
																			'<tr>'+
																				'<th style="width:20%" height="10">LINK:</th>'+
																				'<th style="width:80%" align="left"><a href="'+this["url"]+'">'+this["url"]+'</a></th>'+
																			'</tr>'+
																			'<tr>'+
																				'<th valign="top" height="50">Content:</th>'+
																				'<td valign="top" align="left">'+this["context"]+'</td>'+
																			'</tr>'+
																		'</table>';
								}
							);
						}
						$("#modifyFavoritesLinkArea").html(modifyFavoritesLinkAreaScript);
					},
					error:function(xhr, ajaxOptions, thrownError)
					{
						alert(xhr.status);
						alert(thrownError);
						location.reload();
					}
				}
			);
			$("#deleteLinkSubmit").on('click',function() 
				{
					var phpUrl="favorites_edit"
					
					var modifyContextId_val = localStorage.getItem("modifyContextId");
					var table_val="favorites_list";
					
					var passData = "table_php=" + table_val + "&modifyContextId_php=" + modifyContextId_val;


					$.ajax(
						{
							//async: false,
							url: phpUrl,
							data: passData,
							type:"delete",
							dataType:'text',
							success: function(msg)
							{
								if (msg)
								{
									alert("Favourites Link Delete");
								}else{
									alert(msg);
								}
							},
							error:function(xhr, ajaxOptions, thrownError)
							{
								/*alert(xhr.status);
								alert(thrownError);*/
								location.reload();
							}
						}
					);

					localStorage.removeItem("modifyContextId");
					window.location.assign("favorites");
				}
			);
			$("#modifyContextSubmit").on('click',function() 
				{
					var phpUrl="favorites_edit"
					
					var newContext_val=$("#context_textarea").val();
					var modifyContextId_val = localStorage.getItem("modifyContextId");
					var table_val="favorites_list";
					
					var passData = "table_php=" + table_val + "&modifyContextId_php=" + modifyContextId_val + "&newContext_php=" + newContext_val;
					$.ajax(
						{
							//async: false,
							url: phpUrl,
							data: passData,
							type:"put",
							dataType:'text',
							success: function(msg)
							{
								if (msg)
								{
									alert("Favourites Link Context update");
								}else{
									alert(msg);
								}
							},
							error:function(xhr, ajaxOptions, thrownError)
							{
								/*alert(xhr.status);
								alert(thrownError);*/
								location.reload();
							}
						}
					);

					localStorage.removeItem("modifyContextId");
					window.location.assign("favorites");
				}
			);

		}
	);