//這個檔案需要linker.js才能運作
//這個物件主要負責處理登入及登出等的狀態問題

var stater=new Object();

stater.state="not_initialized";
stater.state_ni="not_initialized";
stater.state_li="logged_in";
stater.state_lt="logged_out";
stater.em_for=true;
stater.cookieKey=jam_cookie_key;
stater.bgt="請傳入bgts物件"

stater.onLogIn=function(){
		this.showOnLogIn();
		this.setBgts();
}

stater.onLogOut=function(){
		this.showOnLogOut();
		this.setBgts();
}

stater.showOnLogOut=function(){
		console.log("state.showOnLogOut 是一個還沒有被實作的方法，用來在登出時改變顯示的內容，會直接在onLogOut中被呼叫");
}


stater.showOnLogIn=function(){
		console.log("state.showOnLogIn 是一個還沒有被實作的方法，用來在登入時改變顯示的內容，會直接在onLogIn中被呼叫");
}


stater.setBgts=function(){
	switch(stater.state){
		case "logged_in":this.bgt.bgtLoggedIn(); break;
		case "initialized";this.bgt.bgtLoggedOut();break;
		default:alert("你是不是哪裡打錯了");
	}
	
}

//假設state=not initialized
stater.doInit=function(){
	console.log("init something here and then checkState");
	this.checkState();
}

//檢查state
stater.checkState=function(){
	var newState="";
		if(this.state!=this.state_ni){
			if(mem.logged_in()){
				newState=this.state_li;
			}else{
				newState=this.state_lt;
			}
		}else{
			this.doInit();
		}
		
	}
	
	
}