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
	
	
	function(){
		var methods={
			checkNewMessage : checkNewMessage,//檢查是否有新訊息
			getMessage :　getMessage,//取得完整訊息
			sendMessage : sendMessage,//發送訊息給指定使用者
			setupTest : setupTesting,//設定測試用環境，測試現場實作
			chkMsgBody : checkMsgBody,//發送訊息前檢查，檢查訊息本文是否符合規定
			checkMailto :chekMailto ,//發送訊息前檢查或當下，檢查寄件對象是否存在
			showOnCheck :showOnCheck, //檢查完成後改變顯示內容
			showOnNewMessage : showNewMessage,//如果有新訊息則將訊息顯示出來
			checkMsgLength : checkMsgLength, //檢查長度設定
			udata : null
			
		}
		//檢查有沒有新信，呼叫showOnNewMessage
		function chekcNewMessage(callback){
			var req=new Object();
			var xhr=new XMLHttpRequest();
			xhr.onreadystatechange=function(resp){
				
				switch(xhr.readyState){
					case 1:xhr.send();break;
					case 4: if(xhr.status==200){
							showOnNewMessage(JSON.parse(xhr.responseText));
					}break;
					default :console.log(xhr.status);break;
				}
			}
			xhr.open("GET",base_url+service_messagebox,true);
			
			
		}
		
		
		//取得訊息本體，取得後呼叫showOnNewMessage將內容寫出
		function getMessage(){
			
		}
		
		//發送訊息，info：物件，結構建下方
		/*
			info={
				to_user:對象
				msg:訊息本體
			}
		
		*/
		function sendMessage(info){
			
			
		}
		
		
		
		function setupTesting(data){
			//data{ 
			//userid : xxxxxxx 
			//}
			//udata正常是要從cookie抓。
			this.udata=data;
			
		}
		
		//檢查發文本文是否符合規定(字數、奇怪字元...etc)
		//回傳數字陣列，表示狀況。1201:無問題 1:訊息超過長度 2:訊息空白 3:收件者格式錯誤
		function checkMsgBody(callback){
			
			callback(1201);
		}
		//檢查寄件對象是否存在、格式是否正確
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


