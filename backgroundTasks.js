
var bgts=new Object();

bgts.taskList=new Array();

bgts.bgtLoggedOut=null;//onLoggedOut跟onLoggedIn預設由外部傳入，如果是null，則沒有執行任何動作的必要。

bgts.bgtLoggedIn=null;

bgts.activateBgt=function(interval,job){
	if( job.length>0){
	for(var i=0;i <job.length;i++){
		if(job[i]!=null){
			bgts.taskList.push(setInterval(job[i],interval));
			}
		}
	}
	
}

//關閉現在正在運作中的interval，全部關完後重設tasklist陣列，如果該陣列是空的就甚麼都不做。
bgts.deActivateBgts=function(){
	var tl=bgts.taskList;
	if(tl.length>0){
		for(var i=job.length;i>0 ;i--){
			clearInterval(tl[i-1]);
		}
		//重設taskList
		tl=[];
	}
		
}