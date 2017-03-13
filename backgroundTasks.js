(window.bgts=function(){
	var methods={
		taskList :[],
		bgtLoggedIn :null,
		bgtLoggedOut :null,
		activateBgt : activateBgt,
		deActivateBgts :deActivateBgts
		
		};
	
	
		function activateBgt(interval,job){
			if( job.length>0){
				for(var i=0;i <job.length;i++){
					if(job[i]!=null){
					bgts.taskList.push(setInterval(job[i],interval));
					}
				}
			}else{return ;}
		}

		function deActivateBgts(){
			var tl=bgts.taskList;
			if(tl.length>0){
				for(var i=job.length;i>0 ;i--){
					clearInterval(tl[i-1]);
					}
				//重設taskList
				tl=[];
			}
				
		}
	
	return methods;
}())
