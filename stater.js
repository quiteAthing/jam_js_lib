//這個檔案需要linker.js才能運作
//這個物件主要負責處理登入及登出等的狀態問題

var stater=new Object();


(window.stater=function(){
	var methods={
		state, "not_initialized",
		state_li: "logged_in",
		state_lt: "logged_out",
		state_ni:"not_initialized",
		em_for_login : true,
		cookieKey : jam_cookie_key,
		onLogIn :onLogIn,
		showOnLogIn :null,
		showOnLogOut :null,
		doInit :doInit,
		checkState :checkState
		};
	
	function onLogIn(rst){
		if(rst){
			stater.showOnLogIn();
			bgts.activateBgt(sys_bgt_interval,[bgts.bgtLoggedIn])
			
		}else{
			console.log("failed to log in");	
			}
	}
	
	function onLogOut(){
		stater.showOnLogOut();
		stater.setBgts();
	}
	
	function doInit(){
		console.log("init something here and then checkState");
		stater.state=stater.state_lt;
	}
	
	function checkState(){
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
		
	return methods;
	
}())








