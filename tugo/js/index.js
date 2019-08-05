var search_l = document.querySelector(".search_l");
var oA = document.querySelectorAll(".options a");
var options = document.querySelector(".options")
search_l.onclick = function() {
    options.style.display = "block";
}
oA.onmouseover = function() {
    options.style.display = "block";
}
oA.onmouseout = function() {
    options.style.display = "none";
}

// 搜索框
    var odiv = document.getElementById("god");
    var options = document.querySelector(".options");
    var oA = document.querySelectorAll(".options a");
    // 设置初始值
    var index = 0;
    odiv.innerHTML = oA[index].innerHTML;

    var on = 0;
    odiv.onclick = function (eve) {
        var e = eve || window.event;
        // 阻止事件冒泡
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }

        if (on == 0) {
            options.style.display = "block";
            setActive();
            on = 1;
        } else {
            options.style.display = "none";
            on = 0;
        }
    }

    document.onclick = function () {
        options.style.display = "none";
        on = 0;
    }

    for (var i = 0; i < oA.length; i++) {
        oA[i].index = i;
        oA[i].onmouseover = function () {
            index = this.index;
        }

        oA[i].onclick = function () {
            odiv.innerHTML = this.innerHTML;
            index = this.index;
        }
    }