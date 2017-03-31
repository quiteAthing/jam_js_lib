
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
			msgEndPage:0,//當頁的最後一筆訊息的Id
			totalInbox : 0, //信箱內的信件總數
			msgLocal :0 ,//local已載入的訊息總數。
			idStr :"msg_Id",
			deleteMsg :deleteMsg, //刪除訊息(畫面與資料庫)
			deleteCurMsg :deleteCurMsg, //刪除當下正在閱讀的訊息
			isChecking :false,	//是否正在檢查新信(避免多次觸發)
			msgOnScr : msgOnScr, //調整訊息在畫面上的顯示狀態
			nextPage : nextPage,
			lastPage : lastPage, 
			amt : 10, //每頁要顯示的資料筆數
			isSending : false //訊息是否已傳送且未獲得回應(避免多次傳送使用)
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
							xhr.setRequestHeader("Content-Type","application/json");
							xhr.send(JSON.stringify(req));
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
				xhr.open("POST",base_url+service_messagebox,true);
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
					case 1:xhr.send(JSON.stringify(req));
							break;
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
			xhr.open("POST",base_url+service_messagebox,true);
			
			
		}
		
		//發送訊息，由btn_send_ms.onclick呼叫，info，由外部提供。info：物件，結構見下方
		function sendMessage(info,cbf){
			console.log("msg.sendMessage :" +info);
			if(msg.isSending){return;}
			console.log("b");
			var req=new Object();
			var xhr=new XMLHttpRequest();
			xhr.onreadystatechange=function(res){
				
				switch(xhr.readyState){
					case 1:
					xhr.setRequestHeader("Content-type", "applicatoin/json");
					xhr.send(JSON.stringify(info));
					console.log(info);
					break;
					case 4: if(xhr.status==200){
							var resp=JSON.parse(xhr.responseText);
							if(resp.sent){
								msg.isSending=false;
								cbf(resp);
								
							}else{
								console.log("wrong  :"+xhr.status);
								msg.isSending=false;
								}
							
					}break;
					default :console.log(xhr.status);break;
				}
			}
			
			xhr.open("POST",base_url+service_sendMsg,true);
			
		}
		
		
		
		
		//檢查訊息是否有必填欄位沒有田寫
		function checkMsgBody(message){
			console.log(message);
			chkMsgLng(message.article);
			console.log("checkMsgBody");
			if(message.receiver==null ||message.title==null|| msg.msgLng==0){
				console.log("receiver"+message.reciver);
				console.log("title"+message.title);
				console.log("length"+msg.msgLng);
				return false;
			}else{
				return true;
			}
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
		console.log("chkMessageLen");
		console.log("ta.value  "+ta.value);
		var count=chkMsgLng(cmt);
			if(count<sys_msg_limit){
				return true;
			}else if(count ==0){
				return false;
			}else{
				return false;
			}
				
			}
			
		function chkMsgLng(ctn){
			var count=0;
			console.log(ctn.length);
			for(var i=0;i< ctn.length;i++){
				if(ctn.charCodeAt(i)>127){
					count+=3;
				}else{
					count+=1;
				}
			}
			
			msg.msgLng=count;
			console.log("ret");
			return count;

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
			
			
		function deleteCurMsg(curMsg){
			var msgId="#"+msg.idStr+curMsg;
			console.log(msgId);
			$(msgId).remove();
			deleteMsgReq([curMsg]);
			msg.msgAll.splice(msg.msgAll.indexOf(curMsg),1);
			msg.msgSelected.splice(msg.msgSelected.indexOf(curMsg),1);
			msg.msgOnScr();
		}
				
				
		
		
		function deleteMsg(){
			var msgId=null;
			var amtSelected=msg.msgSelected.length;
					if(msg.msgSelected.length==0){
						console.log("msgselecte.Length ==0")
						return null;}
					if(confirm("確定刪除所選訊息?")){
						deleteMsgReq(msg.msgSelected);
						for(var r=0;r<msg.msgSelected.length;r++){
							var msgId="#"+msg.idStr+msg.msgSelected[r];
							$(msgId).remove();
							console.log("remove    "+msgId);
						}
						msg.msgSelected=[];
					}
					
				msg.msgOnScr();
		}
		
		function deleteMsgReq(msgs){
			var xhr=new XMLHttpRequest();
			var delReq={
					msgDelete :msgs
			};
			xhr.onreadystatechange=function(resp){
				switch(xhr.readyState){
					case 1:
						xhr.setRequestHeader("Content-Type","application/json");
						xhr.send(JSON.stringify(delReq));
						console.log("del sent");
						break;
					case 4:
						var rst=JSON.parse(resp.responseText);
						console.log("rst.delete : "+resp.delSuccess);
						break;
				
				}
				
			}
			xhr.open("POST",base_url+"/deleteMsg",true);
			
		}
		
		function msgOnScr(){
				var onScr=$(".nxx_msg[value=onDisplay]").length;
				var onHid=$(".nxx_msg[value=onHidden]").toArray();
				var count=10-onScr;
				var page=0;
					//把抓回來，需要顯示出來的訊息設成可見
				if(onScr==0 || onScr<10){
					for(var p=0;p<count;p++){
						var a=$(onHid[p]);
						a.css("display","block");
						a.attr("value","onDisplay");
						a.find(":checkbox").prop("checked",false)
						
					}
					
					
				}
		}
		
		
				return methods;
		}())
			
			
		
		
		

		
		
		
		
		
		
		
	


