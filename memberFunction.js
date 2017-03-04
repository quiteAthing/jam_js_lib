//這個腳本需要FB sdk方能運作
//這個腳本需要使用linker.js的內容
//這個腳本的內容在外界以mem呼叫
var mem=new Object();

//這裡的cookie key從linker裡面拿
mem.cookieKey=jam_cookie_key;

//info: object,type:{("FB"或"normal")} FB:{空白即可} ,normal{acc,pwd}
mem.login=function(info,callback){
	var cbf=callback;
		switch(info.type){
			case "FB" :jamLogin(getFbInfo());break;
			case "normal":jamLogin(info);break;
		}

	mem.getFbInfo=getFbInfo;
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

		//測試用的方法，沒在伺服器上時使用此處。
/* 		if(dummyResponse(true)){
			fbUinfo.fbUid="fake facebook userID";
			fbUinfo.type=c_lt_fb;
		}else{
			fbUinfo=null;
			} */
		
		return fbUinfo;
	}
		
		function jamLogin(uInfo){
		
		//送出一個xhr到jam的伺服器，然後等待回應
		//實際運作內容，沒有在伺服器上時請註解
		
		
		var xhr=new XMLHttpRequest();
		xhr.onreadystatechange=function(){
			switch(xhr.readyState){
				case 1:xhr.send(uInfo);break;
				case 4:
					if(xhr.status==200){
						var resp=xhr.responseText;
						var info=JSON.parse(resp);
						if(info["loginSuccess"]){
							document.cookie=getCookieString(mem.cookieKey,resp);
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

		//測試用內容，沒有在伺服器上時使用下方
		/* 
		if(dummyResponse(true)){
			//把假資料寫進cookie
			document.cookie=getCookieString(jam_cookie_key,JSON.stringify(dummyUinfo()));
			cbf(true);
		}
	 */
	}

} 



//如果有登入過且未傳入callback則回傳true，接受一個parameter callback,可接受要做的事
mem.loggedin=function(callback){
	var cbf=callback;
		if(getCookieString(this.cookieKey,document.cookie)!= ""){
			if(cbf !=undefined){cbf(document.cookie);}
				else{return true;}
		}
		else{return false;}
		function getCookieString(key,str){
			var cookieString=key+"="+str+";";
			return cookieString;
			}

//登入並且檢查cookie及session是否均有效，若其中一方無效則回傳false，若有傳入callback則呼叫callback	
	
	
}

mem.validLogin=function(){
	console.log("這個方法暫時沒有被使用");
}

//必須傳入一個function，描述成功或不成功時要做的事情。會傳入true或false
mem.validateAcc=function(onValid){
	//jam/checkAcc
	var cbf=onValid;
	var data.acc=document.getElementById(field_ACC).value;
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(resp){
		switch(xhr.readyState){
			case 1:xhr.send(data);break;
			case 4:if(xhr.status==200){
				var rs=SON.parse(xhr.responseText);
				cbf(rs.accExt);
			}break;
		}
	}
	
	xhr.open("POST","localhost:8080/jam/checkAcc",true);
	
		

}

//傳入一個物件，包含所有info物件該有的內容，以及一個不管成功與失敗都要做的callback
mem.register=function(rInfo,callback){
	var cbf=callback;
	switch(rInfo.type){
		case "FB":rInfo.fbUID=this.getFbInfo();break;
		case "normal":reg();break;
	}
	
	function reg(){
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(resp){
		switch(xhr.readyState){
			case 1:xhr.send(rInfo);break;
			case 4:if(xhr.status==200){
				var rs=JSON.parse(xhr.responseText);
				cbf(rs.regSuccess);
			}break;
		}
	}
	
	xhr.open("POST","localhost:8080/jam/register",true);
		
		
	}

	
}

