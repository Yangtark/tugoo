
 var txt1 = document.getElementById("user");
 var txt2 = document.getElementById("pass");
 var sp1 = document.querySelector(".sp1");
 var sp2 = document.querySelector(".sp2");
 var btn = document.getElementById("btn");
 var gg = document.querySelector(".ggp");
var onoff = onpass = false;
btn.onclick = function (){
    if(!onoff&&onpass){
        ggp.style.display = "block";
    }
}
 txt1.onblur = function () {
    if (txt1.value === "") {
        sp1.innerHTML = "请填写账户名";
        onoff = false;
    } else {
        sp1.innerHTML = "";
        onoff = true;
    }
}

txt2.onblur = function (){
    if(txt2.value === ""){
        sp2.innerHTML = "请填写登录密码";
        onpass = false;
    }else{
        sp2.innerHTML = "";
        onpass = true;
    }
}















class Login {
    constructor() {
        // 登录的接口
        this.url = "http://api.icodeilife.cn:81/user";
        // 获取元素
        this.user = $("#user");
        this.pass = $("#pass");
        this.btn = $("#btn");
        // this.state = $("p span");
        // 绑定事件
        this.addEvent();
    }

    addEvent() {
        var that = this;
        this.btn.click(function () {
            // 开启ajax
            that.load();
        })
    }

    load() {
        $.ajax({
            url: this.url,
            data: {
                type: "login",
                user: this.user.val(),
                pass: this.pass.val(),
            },
            success: (res) => {
                // 请求成功之后，解析数据，根据数据的返回信息，决定状态
                this.res = JSON.parse(res);

                if (this.res.code == 2) {
                    // this.state.html("用户名和密码不匹配,请重新<a href='login.html'>登录</a>");
                    // this.state.css({color:"red"});
                } else if (this.res.code == 1) {
                    // 登录成功，存储状态
                    // this.setState();
                    // this.state.html("登录成功,3秒后跳转到<a href='index.html'>首页</a>");
                    // this.state.css({color:"green"});
                        location.href = "index.html";
                } else if (this.res.code == 0) {
                    // this.state.html("用户名不存在，请<a href='register.html'>注册</a>");
                    // this.state.css({color:"orange"});
                }
            }
        })
    }
}

new Login;