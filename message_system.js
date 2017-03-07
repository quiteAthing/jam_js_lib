//這個腳本需要用到linker.js
//不使用jquery



/*
linker element:
	service_messagebox: chkMessage
	msg_limit :訊息最大長度，整數


標示用css類別：
	nxx_msgbody : .....	
*/




var msg=makeMessage();
	
	
	function makeMessage(){
		var methods={
			checkNewMessage : checkNewMessage,//檢查是否有新訊息
			getMessage :　getMessage,//取得完整訊息
			sendMessage : sendMessage,//發送訊息給指定使用者
			setupTest : setupTesting,//設定測試用環境，測試現場實作
			chkMsgBody : checkMsgBody,//發送訊息前檢查，檢查訊息本文是否符合規定
			checkMailto :checkMailto ,//發送訊息前檢查或當下，檢查寄件對象是否存在
			showOnCheck :showOnCheck, //檢查完成後改變顯示內容，在現場實作，接收回應json物件。
			showOnNewMessage : showNewMessage,//如果有新訊息則將訊息顯示出來
			checkMsgLength : checkMsgLength, //檢查長度設定
			udata : null,
			isChecking :false //是否正在檢查，如果有，就不要執行第二次。
			
		}
		//檢查有沒有新信，如果有呼叫showOnNewMessage
		function checkNewMessage(){
			var req=new Object();
			var xhr=new XMLHttpRequest();
			xhr.onreadystatechange=function(res){
				
				switch(xhr.readyState){
					case 1:xhr.send();break;
					case 4: if(xhr.status==200){
							var resp=JSON.parse(xhr.responseText);
							if(resp.result>0){
								showOnCheck(resp);
							}
							
					}break;
					default :console.log(xhr.status);break;
				}
			}
			xhr.open("POST",base_url+service_messagebox,true);
			
			
		}
		
		var showOnCheck=null;//現場實作
		
		var showNewMessage=null;//現場實作
		
		
		//取得訊息本體，取得後呼叫showOnNewMessage將內容寫出
		function getMessage(){
			var req=new Object();
			var info=mem.extractCookie(mem.cookieKey);
			req={
				user_id : info.user_id,
				servType : "getMsg",
				rangeType : "idrange",
				rngStart : 0,
				rngEnd :10
				};
			
			var xhr=new XMLHttpRequest();
			xhr.onreadystatechange=function(res){
				
				switch(xhr.readyState){
					case 1:xhr.send(req);break;
					case 4: if(xhr.status==200){
							var resp=JSON.parse(xhr.responseText);
							if(resp.result>0){
								showNewMessage(resp);
							}
							
					}break;
					default :console.log(xhr.status);break;
				}
			}
			xhr.open("POST",base_url+service_messagebox,true);
			
			
		}
		
		//發送訊息，info：物件，結構見下方
		/*
			info={
				to_user:對象
				msg:訊息本體
			}
		
		*/
		function sendMessage(info){
			var req=new Object();
			var xhr=new XMLHttpRequest();
			xhr.onreadystatechange=function(res){
				
				switch(xhr.readyState){
					case 1:xhr.send();break;
					case 4: if(xhr.status==200){
							var resp=JSON.parse(xhr.responseText);
							if(resp.result>0){
								showOnCheck(resp);
							}
							
					}break;
					default :console.log(xhr.status);break;
				}
			}
			xhr.open("POST",base_url+service_sendMsg,true);
			
		}
		
		
		
		
		//檢查發文本文是否符合規定(字數、奇怪字元...etc)
		//回傳數字陣列，表示狀況。1201:無問題 1:訊息超過長度 2:訊息空白 3:收件者格式錯誤
		function checkMsgBody(callback){
			
			callback(1201);
		}
		//檢查寄件對象是否存在、格式是否正確
		//這邊可能需要另一個API，把我自己用的測試API也丟進主Repo?
		
		function checkMailto(){
			
		}
		
		//檢查訊息長度，並回傳長度(單位：字元數)
		function checkMsgLength(){
			var msgLng=0;
			
			return msgLng;
		}
		
		function showOnNewMessage(){
			
		}
		

		
		
		
		
		
		return methods
	}


