/**
 * 
 */
//模擬登入用的物件，所有作假資料相關的內容都寫在這個js檔。

 
 
 var liar=createLiar();
 
 
 function createLiar(){
	 var methods={
		 fakeLogin : setup_system
		 
		 
	 };
	 
	 	//修改系統內容，
	function setup_system(){
		setup_fakeCookie();
		stater.checkState();
		function  setup_fakeCookie(){
			
			var data={
				login_success : true,
				user_id : 1,
				nickname :"Josh"
					};
				var resp=JSON.stringify(data);
				document.cookie=mem.getCookieString(mem.cookieKey,resp);
		}
			//覆寫stater.showOnLogin
			stater.showOnLogIn=function(){
				var biscuit=mem.extractCookie(mem.cookieKey);
		/*
				$("#responder").html("login success  :  "+biscuit.login_success);
				$("#responder1").html("user id  :  "+biscuit.user_id);
				$("#responder2").html("user nickname    :   "+biscuit.nickname);
		*/
			}
			
			bgts.bgtLoggedIn=msg.checkNewMessage;
			stater.checkState();
	}
	 
	 return methods;
 }
 

	
 
 


	
