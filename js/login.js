$("#btn").on("click",function () {
    var obj={
        email:$("#email").val(),
        password:$("#pwd").val()
    };
    var Data=$.param(obj);
    $.ajax({
        url:"login.php",
        type:"get",
        data:Data,
        dataType:"text",
        success:function (dat) {
            if(dat==1){
                document.cookie="email="+$("#email").val();
                alert("登录成功！正在跳转！");
                $(window).attr("location","index.html");
            }else{
                $("#email").val("");
                $("#pwd").val("");
                alert("邮箱或密码错误！请重新输入！")
            }
        }
    })
});