function makeMessage(){function b(){var b=new XMLHttpRequest;b.onreadystatechange=function(a){switch(b.readyState){case 1:b.send();break;case 4:if(200==b.status){var d=JSON.parse(b.responseText);d.result>0&&c(d)}break;default:console.log(b.status)}},b.open("POST",base_url+service_messagebox,!0)}function f(){var a=kie.getCookieJson(mem.cookieKey),b={user_id:a.user_id,servType:"getMsg",rngStart:0},c=new XMLHttpRequest;c.onreadystatechange=function(a){switch(c.readyState){case 1:c.send(b);break;case 4:if(200==c.status){var e=JSON.parse(c.responseText);e.result>0&&d(e)}break;default:console.log(c.status)}},c.open("POST",base_url+service_messagebox,!0)}function g(a){var c=(new Object,new XMLHttpRequest);c.onreadystatechange=function(a){switch(c.readyState){case 1:c.send();break;case 4:if(200==c.status){var b=JSON.parse(c.responseText);b.result>0&&msg.showOnMsgSent(b)}break;default:console.log(c.status)}},c.open("POST",base_url+service_sendMsg,!0)}function h(a){return console.log("checked"),!0}function i(){return console.log("msg.checkMailto : 檢查寄件對象是否存在，考慮直接使用 checkAcc api，目前直接回傳true"),!0}function j(a){for(var b=a.value,c=0,d=0;d<b.length;d++)c+=b.charCodeAt(d)>127?3:1;return msg.msgLng=c,c<sys_msg_limit}var a={checkNewMessage:b,getMessage:f,sendMessage:g,chkMsgBody:h,checkMailto:i,showOnCheck:c,showOnNewMessage:d,checkMsgLength:j,showOnMsgSent:e,udata:null,isChecking:!1,msgLng:0,msgSelected:[],msgRng:[0,0]},c=function(a){},d=null,e=null;return a}window.kie=function(){function b(a,b){document.cookie=f(a,b)}function d(a){for(var b=document.cookie,c=b.split(";"),d=void 0,e=0;e<c.length;e++){var f=c[e].split("=");if(f[0]=f[0].replace(" ",""),f[0]==a)return d=f[1]}}function e(a){return JSON.parse(d(a))}function f(a,b){var c=a+"="+b+";";return c}function g(a){document.cookie=f("key","")}var a={setCookie:b,setCookieObj:setCookieObj,getCookieStr:d,getCookieJson:e,cleanCookie:g};return a}();var bgts=new Object;bgts.taskList=new Array,bgts.bgtLoggedOut=null,bgts.bgtLoggedIn=null,bgts.activateBgt=function(a,b){if(b.length>0)for(var c=0;c<b.length;c++)null!=b[c]&&bgts.taskList.push(setInterval(b[c],a))},bgts.deActivateBgts=function(){var a=bgts.taskList;if(a.length>0){for(var b=job.length;b>0;b--)clearInterval(a[b-1]);a=[]}};var mem=new Object;mem.cookieKey=jam_cookie_key,mem.login=function(a,b){function d(){var a=new Object;return FB.getLoginStatus(function(b){"connected"===b.status?a.fbUID=b.authResponse.userID:"not_authorized"===b.status?FB.login(function(a){d()}):(FB.louout(function(){console.log("fbLogOut")}),a=null)}),a}function e(a){var b=new XMLHttpRequest;b.onreadystatechange=function(){switch(b.readyState){case 1:b.send(a);break;case 4:if(200==b.status){var d=b.responseText,e=JSON.parse(d);e.loginSuccess&&(kie.setCookieJson(mem.cookieKey,d),c(!0))}else c(!1)}},null!=a?b.open("POST",base_url+service_login,!0):c(!1)}var c=b;switch(a.type){case"FB":e(d());break;case"normal":e(a)}mem.getFbInfo=d},mem.logout=function(){kie.cleanCookie(mem.cookieKey,"")},mem.loggedin=function(a){var b=a;return""!=kie.getCookieString(mem.cookieKey)&&(void 0==b||void b(document.cookie))},mem.validateAcc=function(a){var b=a,c=new Object;c.acc=document.getElementById(field_ACC).value;var d=new XMLHttpRequest;d.onreadystatechange=function(a){switch(d.readyState){case 1:d.send(c);break;case 4:if(200==d.status){var e=SON.parse(d.responseText);b(e.accExt)}}},d.open("POST",base_url+service_checkACC,!0)},mem.register=function(a,b){function d(){var b=new XMLHttpRequest;b.onreadystatechange=function(d){switch(b.readyState){case 1:b.send(a);break;case 4:if(200==b.status){var e=JSON.parse(b.responseText);c(e.regSuccess)}}},b.open("POST",base_url+service_register,!0)}var c=b;switch(a.type){case"FB":a.fbUID=this.getFbInfo();break;case"normal":d()}};var msg=makeMessage(),stater=new Object;stater.state="not_initialized",stater.state_ni="not_initialized",stater.state_li="logged_in",stater.state_lt="logged_out",stater.em_for_login=!0,stater.cookieKey=jam_cookie_key,stater.onLogIn=function(a){a?(stater.showOnLogIn(),stater.setBgts(),bgts.activateBgt(sys_bgt_interval,[bgts.bgtLoggedIn])):console.log("failed to log in")},stater.onLogIn=function(){stater.showOnLogIn(),bgts.activateBgt(sys_bgt_interval,[bgts.bgtLoggedIn])},stater.onLogOut=function(){stater.showOnLogOut(),stater.setBgts()},stater.showOnLogOut=function(){console.log("state.showOnLogOut 是一個還沒有被實作的方法，用來在登出時改變顯示的內容，會直接在onLogOut中被呼叫")},stater.showOnLogIn=function(){console.log("state.showOnLogIn 是一個還沒有被實作的方法，用來在登入時改變顯示的內容，會直接在onLogIn中被呼叫")},stater.doInit=function(){console.log("init something here and then checkState"),stater.state=stater.state_lt},stater.checkState=function(){if(stater.state!=stater.state_ni)switch(mem.loggedin()){case!0:stater.state!=stater.state_li&&(stater.onLogIn(),stater.state=stater.state_li);break;case!1:stater.state!=stater.state_lt&&(stater.onLogOut(),stater.state=stater.state_lt)}else stater.doInit()};