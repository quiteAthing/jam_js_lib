

(window.kie=function(){
		var methods={
			setCookie : setCookie ,//設置一個基本型的cookie
			setCookieObj :setCookieObj,//設置一個以物件寫入的cookie
			getCookieStr : getCookieStr,//取得字串cookie
			getCookieJson : getCookieJson,//取得Json格式的cookie
			cleanCookie :cleanCookie
		};
		
		function setCookie(key,value){
			document.cookie=makeCookieString(key,value);

		}
		
		function setJsonCookie(key,obj){
			setCookie(key,JSON.stringify(obj));
		}
		
		function getCookieStr(key){
			var cookie=document.cookie;
			var dataSet=cookie.split(";");
			var result=undefined;
			for(var i=0;i<dataSet.length;i++){
				var dataPair=dataSet[i].split("=");
				dataPair[0]=dataPair[0].replace(" ","");
				if(dataPair[0]==key){
					result=dataPair[1];
					return result;
				}
			}
		}
		
		function getCookieJson(key){
			return JSON.parse(getCookieStr(key));
		}
		
		function makeCookieString(key,str){
			var cookieString=key+"="+str+";";
			return cookieString;
		}
		
		function cleanCookie(key){
			document.cookie=makeCookieString("key","");
		}

			

		
	 return methods;
	}()
 )


 
 


	
