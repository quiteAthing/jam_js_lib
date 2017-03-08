//這個腳本需要用到linker.js
//不使用jquery



/*
linker element:
	service_messagebox: chkMessage
	sys_msg_limit :訊息最大長度，整數


標示用css類別：
	nxx_msgbody : .....	
*/




var msg=makeMessage();
	
	
	function makeMessage(){
		var methods={
			checkNewMessage : checkNewMessage,//檢查是否有新訊息
			getMessage :　getMessage,//取得完整訊息
			sendMessage : sendMessage,//發送訊息給指定使用者
			chkMsgBody : checkMsgBody,//發送訊息前檢查，檢查訊息本文是否符合規定
			checkMailto :checkMailto ,//發送訊息前檢查或當下，檢查寄件對象是否存在
			showOnCheck :showOnCheck, //檢查完成後改變顯示內容，在現場實作，接收回應json物件。
			showOnNewMessage : showOnNewMessage,//如果有新訊息則將訊息顯示出來
			checkMsgLength : checkMsgLength, //檢查長度設定
			showOnMsgSent : showOnMsgSent,//送出成功後改變畫面
			udata : null,
			isChecking :false, //是否正在檢查，如果有，就不要執行第二次。
			msgLng : 0 //已輸入的訊息長度
			
		}
		//檢查有沒有新信，如果有呼叫showOnNewMessage
		function checkNewMessage(){
			var req={
				servType : "newMsg"
			};
			
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
		//現場實作，接到是否有新訊息的結果後改變顯示狀態。接收回傳的json物件。
		var showOnCheck=function(resp){
			
		}
		
		//現場實作，接到新訊息內容後改變顯示的內容。接收一個json物件，含有回傳訊息內容。
		var showOnNewMessage=null;
		
		//訊息傳送後改變顯示的畫面
		var showOnMsgSent=null;
		
		
		//取得訊息本體，取得後呼叫showOnNewMessage將內容寫出
		function getMessage(){
			var req=new Object();
			var info=mem.extractCookie(mem.cookieKey);
			req={
				user_id : info.user_id,
				servType : "getMsg",
				rngStart : 0
				};
			
			var xhr=new XMLHttpRequest();
			xhr.onreadystatechange=function(res){
				
				switch(xhr.readyState){
					case 1:xhr.send(req);break;
					case 4: if(xhr.status==200){
							var resp=JSON.parse(xhr.responseText);
							if(resp.result>0){
								showOnNewMessage(resp);
							}
							
					}break;
					default :console.log(xhr.status);break;
				}
			}
			xhr.open("POST",base_url+service_messagebox,true);
			
			
		}
		
		//發送訊息，由btn_send_ms.onclick呼叫，info，由外部提供。info：物件，結構見下方
		function sendMessage(info){
			var req=new Object();
			var xhr=new XMLHttpRequest();
			xhr.onreadystatechange=function(res){
				
				switch(xhr.readyState){
					case 1:xhr.send();break;
					case 4: if(xhr.status==200){
							var resp=JSON.parse(xhr.responseText);
							if(resp.result>0){
								msg.showOnMsgSent(resp);
							}
							
					}break;
					default :console.log(xhr.status);break;
				}
			}
			xhr.open("POST",base_url+service_sendMsg,true);
			
		}
		
		
		
		
//檢查訊息是否有弊田欄位沒有田寫
		function checkMsgBody(message){
			console.log("checked");
			return true;
			
		}
		//檢查寄件對象是否存在、格式是否正確
		//這邊可能需要另一個API，把我自己用的測試API也丟進主Repo?
		
		function checkMailto(){
			console.log("msg.checkMailto : 檢查寄件對象是否存在，考慮直接使用 checkAcc api，目前直接回傳true");
			return true;
		}
		
		//檢查訊息長度，並回傳長度(單位：字元數)，由textarea.onkeyup呼叫
		function checkMsgLength(ta){
		var cmt=ta.value;
			var count=0;	
			for(var i=0;i< cmt.length;i++){
				if(cmt.charCodeAt(i)>127){
					count+=3;
				}else{
					count+=1;
				}
			}

			msg.msgLng=count;
			
			
			if(count<sys_msg_limit){
				return true;
			}else{
				return false;
				}
			
		}
		

		
		
		
		
		
		return methods
	}


