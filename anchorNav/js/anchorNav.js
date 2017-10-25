(function (win, $) {
    'use strict';
    
    win.pmProject = win.pmProject || {};
    
    win.pmProject.anchorNav = function (container, args) {
        this.opts = $.extend({}, (args || {}));
        if(!(this.obj = $(container)).length) return;
        this.init();
    },
    win.pmProject.anchorNav.prototype = {
        init : function () {
            this.setElements();
            this.bindEvents();
            this.initialFunc();
            this.getContTopFunc();
        },
        setElements : function () {
            this.nav = $(this.obj);
            this.navWrap = this.nav.wrap('<div class="'+this.opts.navWrapClass+'"></div>').parent();
            this.navBtns = this.nav.find('a').filter(function () {
                var target = $(this),
                    targetHref = target.attr('href');
                if( !$(targetHref).length ) return false;
                return true;
            });
        },
        bindEvents : function () {
            $(win).on('scroll', $.proxy(this.onScrollFunc, this));
            this.navBtns.on('click', $.proxy(this.onClickFunc, this));
        },
        initialFunc : function () {
            this.oldIdx = 0;
            this.navTop = this.nav.offset().top;
            this.navH = this.nav.outerHeight(); // .nav 높이값 체크
            this.navWrap.css('height', this.navH);
        },
        getContTopFunc : function () {
            this.contTopArr = [];
            for(var i = 0; i < this.navBtns.length; i++){
                this.contTopArr.push($(this.navBtns.eq(i).attr('href')).offset().top);
            }
        },
        onScrollFunc : function () {
            this.winTop = $(win).scrollTop();
            this.fixClassFunc();
            this.btnsOnFunc();
        },
        onClickFunc : function (e) {
            e.preventDefault();
            var target = $(e.currentTarget);
            this.curIdx = this.navBtns.index(target);
            this.navBtns.eq(this.oldIdx).removeClass(this.opts.btnsOnClass);
            this.navBtns.eq(this.curIdx).addClass(this.opts.btnsOnClass);
            this.oldIdx = this.curIdx;
            $('html, body').animate({
                scrollTop : this.contTopArr[this.curIdx] - this.navH
            }, this.opts.speed);
        },
        fixClassFunc : function () {
            if(this.winTop >= this.navTop){
                this.navWrap.addClass(this.opts.fixClass);
            }else if(this.winTop < this.navTop){
                this.navWrap.removeClass(this.opts.fixClass);
            }
        },
        btnsOnFunc : function () {
            for(var i = 0; i < this.contTopArr.length; i++){
				if(this.winTop >= this.contTopArr[i]  - this.navH){	
					this.navBtns.removeClass(this.opts.btnsOnClass);
					this.navBtns.eq(i).addClass(this.opts.btnsOnClass);
				}else if (this.winTop < this.contTopArr[0] - this.navH){
					this.navBtns.removeClass(this.opts.btnsOnClass);
				}
			}
        }
    };
    
    $.fn.slidePlugin = function (args) {
        var lengthReturns = [];
        for (var i = 0, max = $(this).length; i < max; i++) {
            var _this = $(this).eq(i);
            lengthReturns.push(new win.pmProject.anchorNav(_this, args));
        }
        return lengthReturns;
    };

})(window, window.jQuery);
