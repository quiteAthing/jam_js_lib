


var bgts=new Object();

bgt.taskList=new Array();

bgts.bgtLoggedOut=function(){}

bgts.bgtLoggedIn=function(){}

bgts.activateBgt=function(interval,job){
	this.taskList.push(setInterval(job,interval));
}