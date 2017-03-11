

//登入畫面
const agree_to_term="#accept-terms";//取得
const btn_login="#login-submit";//一般登入
const btn_logout="#logOut";//登出(不區分))
const btn_continueFB="#login-fb";//FB登入
const btn_register="#reg-submit";//註冊按鈕
const field_ACC="#signup-email";//帳號欄
const field_PW="#signup-password";//密碼欄
const field_CPW="#signup-password-confirm";//確認密碼
const field_Remember_me="#remember-me";//記住我
const field_newMsg="";//用來顯示新信件數量的東西


//會員資料編輯畫面
const btn_uData_submit="#edit-submit";
const field_pic="#member-pic";
const field_instrument="#member-instruments";//數列：X,2,3,4,5;
const field_nickname="#member-name";
const field_uIntro="#member-edit-textarea";
const field_links="#member-media";//數列：X,2,3,4,5,6;


//站內信系統相關資料
const btn_send_message="#send-message"//發送站內信
const btn_cancel_message="";//取消發送
const field_mailto="";
const field_msgbody="";
const cls_msgbody="nxx_msg";//訊息標籤最外層以此標示
const servie_mailbox="/messageBox";
const service_sendMsg="/sendMsg";
const sys_msg_limit=3000;//站內信長度限制



//▼半廢棄變數▼
//sta相關內容移到stater
//var sta=0;
//const not_initialized=0;
//const sta_notLoggedIn=1;
//const sta_loggedIn=2;
//const loginURL="";
//const loginFbURL="";
//cookie 所屬的網域名稱，測試用
//const base_path="";
//▲半廢棄變數▲
const c_loginType="loginType";
const c_lt_fb="FB";
const c_lt_normal="normal";
const jam_cookie_key="jamInfo";
const base_url="http://localhost:8080/jamTest";
const service_login="/login";
const service_checkACC="/checkAcc";
const service_register="/register";
const msg_length_limit=3000;
const service_messsagebox="";
const show_userName="";
const show_login="";
const sys_bgt_interval=30000;//背景作業間隔，單位毫秒

