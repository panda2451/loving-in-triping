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
//---------------------------------------------------------导航条和滚动到顶部
$(window).scroll(function () {
    if($(document).scrollTop()>=$(".bg-bak").outerHeight()){
        $(".navbar").css({
            position:"fixed",
            top:0,
            left:"15%",
            zIndex:5
        });
    }
    if($(document).scrollTop()<$(".bg-bak").outerHeight()){
        $(".navbar").css({
            position:"static"
        });
    }
    if($(document).scrollTop()>=500){
        $(".toTop").css({
            display:"block"
        });
        $(".toTop").on("click",function () {
            $(window).scrollTop(0);
        })
    }else{
        $(".toTop").css({
            display:"none"
        });
    }
});
//------------------------------------------------------登出清除cookie
$("#name").on("click",function () {
    $(".logout").slideToggle();
    $(".logout").on("click",function () {
        setCookie('email',"",-1);
        $("#name").html("吾爱旅行");
        $(this).slideToggle();
    })
});
function setCookie(key,value,time){
    var oDate =new Date();
    oDate.setDate(oDate.getDate()+time);
    document.cookie=key+"="+encodeURI(value)+";expires="+oDate.toGMTString();
}
//-------------------图片蒙版
$(".box-big").on("mouseenter",".box-little",function () {
    $(this).find("div"). stop(false,true).fadeIn();
});
$(".box-big").on("mouseleave",".box-little",function () {
    $(this).find("div"). stop(false,true).fadeOut();
});

