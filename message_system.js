//這個腳本需要用到linker.js
//不使用jquery



/*
linker element:
	service_messagebox: chkMessage
	sys_msg_limit :訊息最大長度，整數

*/




(window.msg=function(){
		var methods={
			checkNewMessage : checkNewMessage,//檢查是否有新訊息
			getMessage :　getMessage,//取得完整訊息
			sendMessage : sendMessage,//發送訊息給指定使用者
			chkMsgBody : checkMsgBody,//發送訊息前檢查，檢查訊息本文是否符合規定，未含有奇怪字元。
			checkMailto :checkMailto ,//發送訊息前檢查或當下，檢查寄件對象是否存在
			checkMsgLength : checkMsgLength, //檢查長度設定
			msgLng : 0, //已輸入的訊息長度
			msgAll : [],	//所有訊息id，每次換頁需要重新初始化。
			msgRng :  [0,0],//陣列，本頁所有的訊息內容。 0:start 1:end
			msgSelected:[],//已選取的信件編號，每次換頁時清空。
			msgEndPage:[],//每一頁的最後一筆訊息的Id
			totalInbox : 0, //信箱內的信件總數
			msgLocal :0 ,//local已載入的訊息總數。
			idStr :"msg_Id",
			deleteMsg :deleteMsg,
			isChecking :false,
			msgOnScr : msgOnScr, //調整訊息在畫面上的顯示狀態
			nextPage : nextPage,
			lastPage : lastPage,
			deleteMSg : deleteMsg, //刪除訊息(畫面與資料庫)
			amt : 10 //每頁要顯示的資料筆數
		}
		
		//檢查有沒有新信，如果有呼叫callback function
		function checkNewMessage(cbf){
			
			var req={
				servType : "newMsg"
			};
			
			
			var xhr=new XMLHttpRequest();
			xhr.onreadystatechange=function(res){
				console.log(xhr.readyState);
				switch(xhr.readyState){

					case 1:if(msg.isChecking){
								console.log("no more");
								break;
							}
							xhr.send();
							msg.isChecking=true;
							break;
					case 4: if(xhr.status==200){
							var resp=JSON.parse(xhr.responseText);
									cbf(resp);
									console.log("wtf");
									msg.isChecking=false;
								}
								else{
									cbf({result: -2});
									msg.isChecking=false;
									
									};
									
					default : 	if(msg.isChecking){
									console.log("retry in 5 secs");
									setTimeout(5000,function(){
									msg.isChecking=false;
									console.log("allow retry");
									});
								};
								break;
				}
			}
				xhr.open("POST",base_url+service_mailbox,true);
				msg.isChecking=true;
				
				console.log(msg.isChecking);
			}
			
			
		
		
		
		
		//取得訊息本體，取得後呼叫callback function將內容寫出
		function getMessage(cbf){			
			var info=kie.getCookieJson(mem.cookieKey);
			var req={
				user_id : info.user_id,
				servType : "getMsg",
				rngStart : msg.msgRng[0]
				};
			
			var xhr=new XMLHttpRequest();
			xhr.onreadystatechange=function(res){
				
				switch(xhr.readyState){
					case 1:xhr.send(req);break;
					case 4: if(xhr.status==200){
							var resp=JSON.parse(xhr.responseText);
							if(resp.result>0){
								if(resp.result!= -1){
								msg.totalInbox=resp.result;}
								cbf(resp);
							}
							
					}break;
					default :console.log(xhr.status);break;
				}
			}
			xhr.open("POST",base_url+service_mailbox,true);
			
			
		}
		
		//發送訊息，由btn_send_ms.onclick呼叫，info，由外部提供。info：物件，結構見下方
		function sendMessage(info,cbf){
			var req=new Object();
			var xhr=new XMLHttpRequest();
			xhr.onreadystatechange=function(res){
				
				switch(xhr.readyState){
					case 1:xhr.send();break;
					case 4: if(xhr.status==200){
							var resp=JSON.parse(xhr.responseText);
							if(resp.result>0){
								cbf(resp);
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
			

			this.msgLng=count;
			
			
			if(count<sys_msg_limit){
				return true;
			}else{
				return false;
		}
				
			}
			
		function deleteMsg(){
			for(var s=0;s<msgSelected.length;s++){
					console.log(selected[s]);
			}			
		}
		
		
				
			function nextPage(){
					var onScr=$(".nxx_msg[value=onDisplay]").toArray();
					var seek=parseInt($(onScr[onScr.length-1]).find(".nxx_msgId").html());
					var start=msg.msgAll.indexOf(seek);
					console.log("ss "+start);
					var limit=msg.msgAll.length-start-1;
					if(limit>msg.amt){limit=msg.amt;}
					if(limit==0){
						if(msg.msgLocal<msg.totalInbox){
							console.log("getNewMessage");
							msg.getMessage(msg.msgOnScr);
						}else{
							console.log("nomore on server");
							return;
						}
						
					}
					
					for(var g=0;g<onScr.length;g++){
						$(onScr[g]).css("display","none");
						$(onScr[g]).css("display","none");
						$(onScr[g]).attr("checked","false");
						$(onScr[g]).attr("value","onHidden");			
					}
					var st=start+limit;
					for(var i=start;i<=st;i++){
							var msgId="#"+msg.idStr+msg.msgAll[i];
							$(msgId).css("display","block");
							$(msgId).attr("value","onDisplay");
					}
				}
				
				
		function lastPage(){
				var onScr=$(".nxx_msg[value=onDisplay]").toArray();
				var seek=parseInt($(onScr[0]).find(".nxx_msgId").html());
				var start=msg.msgAll.indexOf(seek);
				var stop=0;
				if(start==0){ return;}
				if(start-msg.amt>0){
					stop=start-msg.amt;
				}else{
					stop=-1;
				}
				
				
				for(var g=0;g<onScr.length;g++){
					$(onScr[g]).attr("checked","false");
					$(onScr[g]).attr("value","onHidden");			
					$(onScr[g]).css("display","none");
				}
				for(var q=start;q>stop;q--){
					var msgId="#"+msg.idStr+msg.msgAll[q];
					$(msgId).css("display","block");
					$(msgId).attr("value","onDisplay");
				}
				
			}
				
				
		
		
		function deleteMsg(selected){
				var amtSelected=msg.msgSelected.length;
				if(msg.msgSelected.length==0){
					return null;
					}
					if(confirm("確定刪除所選訊息?")){
						msg.deleteMsg();
						for(var r=0;r<amtSelected;r++){
						var msgId="#"+msg.idStr+msg.msgSelected[r];
						$(msgId).remove();
						msg.msgSelected.splice(r,1);
					}
					
				}
				msg.msgOnScreen();
		}
		
		function msgOnScr(){
				var onScr=$(".nxx_msg[value=onDisplay]").length;
				var onHid=$(".nxx_msg[value=onHidden]").toArray();
				var count=10-onScr;
				var page=0;
					//把抓回來，需要顯示出來的訊息設成可見
				if(onScr==0 || onScr<10){
					for(var p=0;p<count;p++){
						console.log("asvs");
						$(onHid[p]).css("display","block");
						$(onHid[p]).attr("value","onPage");
						$(onHid[p]).attr("value","onDisplay");
					}		
				}
		}
		
		
				return methods;
		}())
			
			
		
		
		

		
		
		
		
		
		
		
	


