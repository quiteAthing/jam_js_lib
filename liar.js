/**
 * 
 */
//模擬登入用的物件，所有作假資料相關的內容都寫在這個js檔。

 
 
 var liar=createLiar();
 
 
 function createLiar(){
	 var methods={
		 fakeLogin : fakeLogin,
		 fakeCookie : fakeCookie,
		 makeFakeMessage : makeFakeMessage
	 };
	 
	 function fakeLogin(){
		 document.cookie=kie.setCookieObj(jam_cookie_key,fakeCookie);	 
	 }
	 
	 var fakeCookie={
		 user_id :121,
		 alias : "Johnny",
		 pic :"a base 64 picture"
	 }
	 
	 function makeFakeMessage(){
		 var message=new Object();
		 message.msgs=[];
		 message.result=23;
		 for(var i=0;i<23;i++){
			 message.msgs.push(
			 {	
				msgId : i,
				sender: 112,//寄件者id
				toUser :"johnny2" ,//傳送對象
				title : "Hello",//訊息標題
				msg : "Lorem ipsum" ,//訊息本體
			
			 }
			 
			 );
			 
		 }
		 
		 return message;
		 
		 
	 }
	 
	
	

	 
	 return methods;
 }
 

	
 
 


	
