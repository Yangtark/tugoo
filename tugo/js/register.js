var txt1 = document.getElementById("user");
var txt2 = document.getElementById("pass");
var txt3 = document.getElementById("pass2");
var ps1 = document.querySelector(".ps1");
var ps2 = document.querySelector(".ps2");
var ps3 = document.querySelector(".ps3");
var btn = document.getElementById("btnreg");
var Uoff = P2off = false;
txt1.onblur = function () {
    var reg = /^\w{3,16}$/;
    if (reg.test(txt1.value)) {
        ps1.innerHTML = "";
        Uoff = true;
    } else {
        ps1.innerHTML = "请填写3到16位字符";
        Uoff = false;
    }
}
txt2.onblur = function () {
    var reg = /^[\w_]{6,12}$/;
    if (reg.test(txt2.value)) {
        ps2.innerHTML = "";
    } else {
        ps2.innerHTML = "请填写6到12位字符";
    }
    if (txt3.value == "") return;
    if (txt2.value == txt3.value) {
        ps3.innerHTML = "";
        P2off = true;
    } else {
        ps3.innerHTML = "两次输入的密码不一致";
        P2off = false;
    }
}

txt3.onblur = function () {
    if (txt3.value == txt2.value) {
        ps3.innerHTML = "";
        p2off = true;
    } else {
        ps3.innerHTML = "两次输入的密码不一致";
        p2off = false;
    }
}

btn.onclick = function (){
    if(txt1.value == "" && txt2.value == "" && txt3.value == "") {
        ps1.innerHTML = "请填写账户名";
        ps2.innerHTML = "请填写密码";
    }else if(Uoff && P2off){
        
    }
}













class Register {
    constructor() {
        this.url = "http://api.icodeilife.cn:81/user";
        // 获取元素
        this.user = $("#user");
        this.pass = $("#pass");
        this.pass2 = $("#pass2");
        this.btn = $("#btnreg");
        // this.state = $("p span");
        // 绑定事件
        this.addEvent();
    }

    addEvent() {
        var that = this;
        this.btn.click(function () {
            that.load();
        })
    }

    load() {
        $.ajax({
            url: this.url,
            data: {
                type: "register",
                user: this.user.val(),
                pass: this.pass.val(),
                pass2: this.pass2.val()
            },
            success: (res) => {
                res = JSON.parse(res);
                if (res.code == 0) {
                    // this.state.html("注册失败，请重新注册");
                    // this.state.css({color:"red"});
                } else if (res.code == 1) {
                    // this.state.html("注册成功，3秒后跳转到<a href='login.html'>登录</a>页面");
                    // this.state.css({color:"green"});
                    location.href = "login.html";
                }
            }
        })
    }
}

new Register;