//-----------------------------------图片样式
$(".img-box").on("mouseenter", function () {
    $(this).children(".img-show").stop(false, true).animate({
        opacity: 1
    }, 300);
    $(this).on("mouseleave", function () {

        $(this).children(".img-show").stop(false, true).animate({
            opacity: 0
        }, 300);
    });
});

//-----------------------------------------------------------------微信
/*$(".us div:nth-child(8)").on("mouseenter",function () {
    $(".us div").css({
        display:"none"
    });
    $(".us div.weixin").fadeIn();
    $(".us div.weixin").on("mouseleave",function () {
        $(".us div").slideDown();
        $(".us div.weixin").slideUp();
    })
});*/
//-----------------------------------------------------------------双击全屏
var video = $('#video')[0];
FullOrCallScreen(video);
function FullOrCallScreen(element){
    var count = 0;
    element.addEventListener("dblclick",function(){
        if(count % 2 == 0){
            requestFullScreen(element);
        }else{
            cancelFullScreen(document);
        }
        count++;
    },false);
}
function requestFullScreen(element) {
    var requestMethod=element.requestFullScreen||element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
    if (requestMethod){
        requestMethod.call(element);
    }else if(typeof window.ActiveXObject !== "undefined"){
        //---创建WshShell对象运行程序、操作注册表、创建快捷方式、访问系统文件夹、管理环境变量。
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");//---F11键是全屏
        }
    }
}
function cancelFullScreen(element) {
    var  cancelMethod = element.cancelFullScreen || element.webkitCancelFullScreen || element.mozCancelFullScreen || element.msCancelFullScreen;
    if (cancelMethod){
        cancelMethod.call(element);
    }else if(typeof window.ActiveXObject !== "undefined"){
        //---创建WshShell对象可以运行程序、操作注册表、创建快捷方式、访问系统文件夹、管理环境变量。
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null){
            wscript.SendKeys("{F11}");
        }
    }
}

//-----------------------------------------------------音乐按钮
var mc = 0;
$(".music").on("click", function () {
    if (mc === 0) {
        $("#player")[0].pause();
        mc = 1;
        $(this).css({
            backgroundImage: "url(img/kai.png)"
        });
    }else if(mc===1){
        $("#player")[0].play();
        mc = 0;
        $(this).css({
            backgroundImage: "url(img/ting.png)"
        });
    }
});
//------------------------------------------------------登出清除cookie
$("#name").on("click",function () {
   $(".logout").slideToggle();
   $(".logout").on("click",function () {
       setCookie('email',"",-1);
       $("#name").html("当前账号");
       $(this).slideToggle();
   })
});
function setCookie(key,value,time){
    var oDate =new Date();
    oDate.setDate(oDate.getDate()+time);
    document.cookie=key+"="+encodeURI(value)+";expires="+oDate.toGMTString();
}