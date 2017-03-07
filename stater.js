//這個檔案需要linker.js才能運作
//這個物件主要負責處理登入及登出等的狀態問題

var stater=new Object();

stater.state="not_initialized";
stater.state_ni="not_initialized";
stater.state_li="logged_in";
stater.state_lt="logged_out";
stater.em_for_login=true;
stater.cookieKey=jam_cookie_key;

stater.onLogIn=function(rst){
	if(rst){
		stater.showOnLogIn();
		stater.setBgts();
		bgts.activateBgt(sys_bgt_interval,[bgt.bgtLoggedIn])
		
	}else{
		console.log("failed to log in");	
		}
	}

stater.onLogIn=function(){
		stater.showOnLogIn();
		//下面是正常寫法，這邊因為測試需求所以手動輸入
		bgts.activateBgt(sys_bgt_interval,[bgt.bgtLoggedIn])
}


stater.onLogOut=function(){
		stater.showOnLogOut();
		stater.setBgts();
}

stater.showOnLogOut=function(){
		console.log("state.showOnLogOut 是一個還沒有被實作的方法，用來在登出時改變顯示的內容，會直接在onLogOut中被呼叫");
}


stater.showOnLogIn=function(){
		console.log("state.showOnLogIn 是一個還沒有被實作的方法，用來在登入時改變顯示的內容，會直接在onLogIn中被呼叫");
}

//假設state=not initialized
stater.doInit=function(){
	console.log("init something here and then checkState");
	stater.state=stater.state_lt;
}

//檢查state，如果紀錄的state跟登入狀態不符合，就表示呼叫本方法時該狀態尚未執行完調整畫面的動作。
stater.checkState=function(){
	if(stater.state!=stater.state_ni){
		switch(mem.loggedin()){
			case true :
				if(stater.state!=stater.state_li){
					stater.onLogIn();
					stater.state=stater.state_li;
					}
				break;
			case false :
				if(stater.state!=stater.state_lt){
					stater.onLogOut();
					stater.state=stater.state_lt;
					}
				break;
				}
		}else{
			stater.doInit();
			}
	
	}



