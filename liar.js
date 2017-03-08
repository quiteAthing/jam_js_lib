/**
 * 
 */
//模擬登入用的物件，所有作假資料相關的內容都寫在這個js檔。

 
 
 var liar=createLiar();
 
 
 function createLiar(){
	 var methods={
		 fakeLogin : setup_system,
		 fakeMailbox : fakeMailbox
		 
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

				$("#responder").html("login success  :  "+biscuit.login_success);
				$("#responder1").html("user id  :  "+biscuit.user_id);
				$("#responder2").html("user nickname    :   "+biscuit.nickname);
		
			}
			
			bgts.bgtLoggedIn=msg.checkNewMessage;
			stater.checkState();
	}
	
	//假的mailbox方法
	function fakeMailbox(reqObj){
		console.log("fakeMailbox");
		switch(reqObj.servType){
			case "newMsg": return fakeNewMsg();break;
			case "getMsg": return fakeMails();break;
			default : console.log("你是不是打錯甚麼了");
		}
		
		//假的詢問是否有新信，回傳假的回覆物件
		function fakeNewMsg(){
			var j=Math.round(Math.random()*10);
			if(j==0){j=-1;}
			console.log("fake new msg");
			var rst={result : j }
			return rst;
			
		}
		
		
		//假的取得新信，回傳假的新信物件
		function fakeMails(){
			var k=new Object();
			k.msgs=[];
			for(var i=0;i<10;i++){
				k.msgs.push(
					{
						sendId : i,
						sendNk :("nk"+i.toString()),
						msgBody :"nothing new",
						msgId : i,
						msgTitle :("title  no"+i.toString()),
						msgDate : "2022 Feb 23 ",
						msgState: false
						
					}
				);
				console.log("fakemails");
			}
			return k;			
		}
		
	}
	

	 
	 return methods;
 }
 

	
 
 


	
