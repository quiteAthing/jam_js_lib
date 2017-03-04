
//result 想要的結果是true還是false
var dsvr=new Object();

dsvr.dummyResponse=function(result){
	return result;
}
//回傳偽造的資料

dsvr.dummyUinfo=function(){
		var info=new Object();
		info.userName="Maverick";
		info.success="true";
		return info;
	}