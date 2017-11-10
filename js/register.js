$(function () {
    var regs = {
        //---密码--{6,20}字符
        pwdReg: /^.{6,20}$/,
        //---邮箱
        emailReg: /^[a-zA-Z\d]+([-_.][A-Za-z\d]+)*@([a-zA-Z\d]+[-.])+[a-zA-Z\d]{2,5}$/,
        //---密码等级
        numReg: /\d/,
        strReg: /[a-zA-Z]/,
        tsReg: /[^\u4e00-\u9fa5a-zA-Z0-9]/
    };
    var email = $("#email");
    var pwd = $("#pass");
    var pwd2 = $("#pass2");
    var btn = $(".btn");

    email.on("keyup focus blur", function (ev) {
        var Event = ev || window.event;
        checkEmail(Event);
    });
    function checkEmail(Event) {
        var type;
        if (Event) {
            type = Event.type;
        }
        var value = email.val();
        var box = email.parent();
        var tip = box.next();
        var span = tip.find("span");
        if (type === "focus") {
            if (value === '') {
                box.attr("class", 'box-one');
                tip.attr("class", 'box-two default');
                span.html('请输入邮箱，格式类似：767181742@qq.com');
                return false;
            }
        }
        if (type === 'blur') {
            if (value === '') {
                box.attr("class", 'box-one');
                tip.attr("class", 'box-two hide');
                return false;
            }
        }
        //---出错情况
        if (value === '') {
            box.attr("class", 'box-one error');
            tip.attr("class", 'box-two error');
            span.html('邮箱不能为空');
            return false;
        } else if (regs.emailReg.test(value)) {
            box.attr("class", 'box-one right');
            tip.attr("class", 'box-two hide');
            return true;
        } else {
            box.attr("class", 'box-one error');
            tip.attr("class", 'box-two error');
            span.html('格式错误，必须包含‘ @ ’,‘ . ’等符号');
            return false;
        }
    }

    pwd.on("keyup focus blur", function (ev) {
        var Event = ev || window.event;
        checkPwd(Event);
    });
    function checkPwd(Event) {
        var type;
        if (Event) {
            type = Event.type;
        }
        var value = pwd.val();
        var box = pwd.parent();
        var tip = box.next();
        var span = tip.find("span");
        if (type === "focus") {
            if (value === '') {
                box.attr("class", 'box-one');
                tip.attr("class", 'box-two default');
                span.html('建议使用字母、数字和符号的组合，6-20位');
                return false;
            }
        }
        if (type === 'blur') {
            if (value === '') {
                box.attr("class", 'box-one');
                tip.attr("class", 'box-two hide');
                return false;
            }
        }
        //---出错情况
        if (value === '') {
            box.attr("class", 'box-one error');
            tip.attr("class", 'box-two error');
            span.html('密码不能为空');
            return false;
        } else if (regs.pwdReg.test(value)) {
            box.attr("class", 'box-one right');
            // tip.attr("class",'box-two hide');
            var level = getPwdLevel(value);
            switch (level) {
                case 1:
                    tip.attr("class", 'box-two ruo');
                    span.html('建议修改密码');
                    break;
                case 2:
                    tip.attr("class", 'box-two zhong');
                    span.html('可以使用');
                    break;
                case 3:
                    tip.attr("class", 'box-two qiang');
                    span.html('非常完美');
                    break;
            }
            return true;
        } else {
            box.attr("class", 'box-one error');
            tip.attr("class", 'box-two error');
            span.html('密码应在6-20之间的字符');
            return false;
        }
    }

    function getPwdLevel(pwd) {
        var level = 0;
        var numReg = true;
        var strReg = true;
        var tsReg = true;
        for (var i = 0; i < pwd.length; i++) {
            if (numReg && regs.numReg.test(pwd[i])) {
                level++;
                numReg = false;
                continue;
            }
            if (strReg && regs.strReg.test(pwd[i])) {
                level++;
                strReg = false;
                continue;
            }
            if (tsReg && regs.tsReg.test(pwd[i])) {
                level++;
                tsReg = false;
            }
        }
        return level;
    }

    pwd2.on("keyup focus blur", function (ev) {
        var Event = ev || window.event;
        checkPwd2(Event);
    });
    function checkPwd2(Event) {
        var type;
        if (Event) {
            type = Event.type;
        }
        var value1 = pwd.val();
        var value = pwd2.val();
        var box = pwd2.parent();
        var tip = box.next();
        var span = tip.find("span");
        if (type === "focus") {
            if (value === '') {
                box.attr("class", 'box-one');
                tip.attr("class", 'box-two default');
                span.html('请再次输入密码');
                return false;
            }
        }
        if (type === 'blur') {
            if (value === '') {
                box.attr("class", 'box-one');
                tip.attr("class", 'box-two hide');
                return false;
            }
        }
        //---出错情况
        if (value === '') {
            box.attr("class", 'box-one error');
            tip.attr("class", 'box-two error');
            span.html('请再次输入密码');
            return false;
        } else if (value === value1) {
            box.attr("class", 'box-one right');
            tip.attr("class", 'box-two hide');
            return true;
        } else {
            box.attr("class", 'box-one error');
            tip.attr("class", 'box-two error');
            span.html('两次密码输入不一致');
            return false;
        }
    }

    btn.on("click", function () {
        if (checkPwd() && checkPwd2() && checkEmail()) {
            alert("欢迎注册！");
            var obj = {
                email: email.val(),
                password: pwd.val()
            };
            var Data = $.param(obj);
            $.ajax({
                url: "register.php",
                dataType:"text",
                type: "post",
                data: Data,
                success: function () {
                    alert('注册成功！');
                }
            });
        } else {
            alert('填写格式有误，请重新输入');
        }

    });
});
