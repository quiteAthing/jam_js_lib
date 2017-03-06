


var bgts=new Object();

bgts.taskList=new Array();

bgts.bgtLoggedOut=function(){}

bgts.bgtLoggedIn=function(){}

bgts.activateBgt=function(interval,job){
	for(var i=0;i <job.length;i++){
			this.taskList.push(setInterval(job[i],interval));
	}
	
}