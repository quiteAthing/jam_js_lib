//這個腳本需要FB sdk方能運作
//這個腳本需要使用linker.js的內容var 
//這個腳本的內容在外界以mem呼叫

(window.mem=function(){
	var methods={
		cookieKey : jam_cookie_key,
		login : login,
		logout : logout,
		loggedin :loggedin,
		validateAcc : validateAcc,
		register : register,
		updateData : updateData,
		getMemberData : getMemberData,
		isValidating : false //是否正在檢查code
		
		
	};
	function login(info,cbf){
			switch(info.type){
				case "FB" :jamLogin(getFbInfo(),cbf);break;
				case "normal":jamLogin(info,cbf);break;
			}
	}
	
	function logout(){
	//這邊需要增加server log out 的方法
		kie.cleanCookie(mem.cookieKey,"");
		localStorage.clear();
		sessionStorage.clear();
		var xhr=new XMLHttpRequest();
		xhr.onreadystatechange=function(){
			if(xhr.readyState==0){
				xhr.send();
			}
		xhr.open("POST",base_url+service_logout,"true")
	
		}
	}
		
	//登入並且檢查cookie及session是否均有效，若其中一方無效則回傳false，若有傳入callback則呼叫callback	
	function loggedin(cbf){
		if(kie.getCookieStr(mem.cookieKey)!= ""){
			if(cbf !=null){cbf(document.cookie);}
				else{return true;}
		}
		else{return false;}	
	}
	
	
	function validateAcc(vAcc,cbf){
		var data=new Object();
		data.acc=vAcc;
		var xhr=new XMLHttpRequest();
		xhr.onreadystatechange=function(resp){
			switch(xhr.readyState){
				case 1:xhr.send(JSON.stringify(data));break;
				case 4:if(xhr.status==200){
					var rs=JSON.parse(xhr.responseText);
					cbf(rs.accExt);
				}break;
			}
		}
	
	xhr.open("POST",base_url+service_checkACC,true);
	}
	
	
	function register(rInfo,callback){
		var cbf=callback;
		switch(rInfo.type){
			case "FB":rInfo.fbUID=this.getFbInfo();
				reg(rInfo);
				break;
			case "normal":reg(rInfo);break;
			}
		
	
	function reg(rInfo){
		var xhr=new XMLHttpRequest();
		xhr.onreadystatechange=function(resp){
			switch(xhr.readyState){
				case 1:xhr.send(JSON.stringify(rInfo));break;
				case 4:if(xhr.status==200){
					var rs=JSON.parse(xhr.responseText);
					cbf(rs.regSuccess);
				}break;
			}
		}
	
		xhr.open("POST",base_url+service_register,true);	
		
		}
	}

			
	function getFbInfo(){
		//FB登入相關程序
		var fbUinfo=new Object();

		//實際運作的方法，需要被放置在伺服器上才能運作
		
			FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				fbUinfo.fbUID = response.authResponse.userID;
			} else if (response.status === 'not_authorized') {
				//如果FB用戶沒有授權這個app，則請求授權
				FB.login(function(response){
					getFbInfo();
					});
			} else {
				
				//如果FB用戶沒有同意，設定fbUinfo=null;
				//並將用戶Logout
				FB.louout(function(){console.log("fbLogOut");});
				fbUinfo=null;
				}
			});	
		return fbUinfo;
	}
	
	function jamLogin(uInfo,cbf){			
			//送出一個xhr到jam的伺服器，然後等待回應
			//實際運作內容，沒有在伺服器上時請註解
			var xhr=new XMLHttpRequest();
			xhr.onreadystatechange=function(){
				switch(xhr.readyState){
					case 1:xhr.send(JSON.stringify(uInfo));break;
					case 4:
						if(xhr.status==200){
							var resp=xhr.responseText;
							var info=JSON.parse(resp);
							if(info["loginSuccess"]){
								kie.setCookieObj(mem.cookieKey,resp);
								cbf(true);
							}
						}
						else{
							cbf(false);
						}
				}
			}
			if(uInfo!=null){
				xhr.open("POST",base_url+service_login,true);
			}
			else{
				cbf(false);
				}

		}
		
	function updateData(data,cbf){
		var xhr=new XMLHttpRequest();
		xhr.onreadystatechange=function(){
			
				switch(xhr.readyState){
					case 1:xhr.send(JSON.stringify(data));break;
					case 4:
						if(xhr.status==200){
							var resp=xhr.responseText;
							var info=JSON.parse(resp);
							if(info["updateSuccess"]){
								cbf(true);
							}
								}else{
								console.log("strange  "+xhr.status);
								cbf(false);
								}break;	
				}
			}
		xhr.open("POST",base_url+service_update,true);
	}
	
	function getMemberData(userId,onDataReceive){
		var param="?memberId="+userId;
		if(userId=="isMySelf"){param="";}
		var xhr=new XMLHttpRequest();
		xhr.onreadystatechange=function(){
			
				switch(xhr.readyState){
					case 1:xhr.send();break;
					case 4:
						if(xhr.status==200){
							var resp=xhr.responseText;
							var info=JSON.parse(resp);
							if(info["updateSuccess"]){
								onDataReceive(info);
							}
								}else{
								console.log("strange a "+xhr.status);
								}break;	
				}
			}
		xhr.open("GET",base_url+service_memberdata+param,true);
		
		
	}
		
	
	
	
	return methods;
}())

	
	
	

