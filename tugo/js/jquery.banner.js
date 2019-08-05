;
(function($) {
    "use strict";

    $.fn.banner = function(options) {
        var that = this;
        var ban = {};
        ban.list = options.list === false ? false : true;
        ban.autoplay = options.autoplay === false ? false : true;
        ban.delayTime = options.delayTime || 3000;
        ban.moveTime = options.moveTime || 300;

        if (options.index >= 0 && options.index <= options.items.length - 1) {
            ban.index = options.index;
        } else if (options.index > options.items.length - 1) {
            ban.index = options.items.length - 1;
        } else {
            ban.index = 0;
        }
        ban.iPrev = null;


        // 生成list
        ban.init = function() {
            if (!ban.list) return;
            this.ul = $("<ul>");
            var str = "";
            for (var i = 0; i < options.items.length; i++) {
                str += `<li></li>`
            }
            this.ul.html(str);
            that.append(this.ul);
            this.ul.css({
                width: 150,
                height: 30,
                lineHeight: "30px",
                // float: "left",
                display: "flex",
                // backgroundColor: "rgba(200,200,200,0.6)",
                zIndex: 99999,
                position: "absolute",
                left: "50%",
                bottom: 0,
                margin: 0,
                padding: 0,
                listStyle: "none",
                textAlign: "center"
            }).children("li").css({
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "#999",
                marginRight: 10,
            }).eq(ban.index).css({
                backgroundColor: "#A40000",
                // color: "#ccc"
            })
            this.listAction();
        }
        ban.listAction = function() {
            var _this = this;
            this.ul.children("li").click(function() {
                if ($(this).index() > _this.index) {
                    _this.listMove(1, $(this).index())
                }
                if ($(this).index() < _this.index) {
                    _this.listMove(-1, $(this).index())
                }
                _this.index = $(this).index();

                _this.ul.children("li").css({
                    backgroundColor: "#999",
                    color: ""
                }).eq(_this.index).css({
                    backgroundColor: "#A40000",
                    // color: "#ccc"
                })
            })
        }

        ban.listMove = function(type, iNow) {
            options.items.eq(this.index).css({
                left: 0
            }).stop().animate({
                left: -options.items.eq(0).width() * type
            }, this.moveTime).end().eq(iNow).css({
                left: options.items.eq(0).width() * type
            }).stop().animate({
                left: 0
            }, this.moveTime)
        }

        ban.btnActive = function() {
            if (!(options.left != undefined && options.left.length > 0 && options.right != undefined && options.right.length > 0)) return;
            var _this = this;

            options.left.on("click", this.leftClick.bind(this));

            options.right.on("click", this.rightClick.bind(this));
        }

        ban.leftClick = function() {
            if (this.index == 0) {
                this.index = options.items.length - 1;
                this.iPrev = 0;
            } else {
                this.index--;
                this.iPrev = this.index + 1;
            }
            this.btnMove(-1);
        }

        ban.rightClick = function() {
            if (this.index == options.items.length - 1) {
                this.index = 0;
                this.iPrev = options.items.length - 1;
            } else {
                this.index++;
                this.iPrev = this.index - 1;
            }
            this.btnMove(1);
        }

        ban.btnMove = function(type) {
            options.items.eq(this.iPrev).css({
                left: 0
            }).stop().animate({
                left: -options.items.eq(0).width() * type
            }, this.moveTime).end().eq(this.index).css({
                left: options.items.eq(0).width() * type
            }).stop().animate({
                left: 0
            }, this.moveTime)

            this.ul.children("li").css({
                backgroundColor: "#999",
                color: ""
            }).eq(this.index).css({
                backgroundColor: "#A40000",
                // color: "#ccc"
            })
        }
        ban.autoAction = function() {
            var _this = this;
            if (!options.autoplay) return;

            _this.time = setInterval(() => {
                this.rightClick();
            }, options.delayTime);

            that.hover(function() {
                clearInterval(_this.time);
            }, function() {
                _this.time = setInterval(() => {
                    _this.rightClick();
                }, options.delayTime);
            })
        }


        ban.init();
        ban.btnActive();
        ban.autoAction();

    }
})(jQuery);