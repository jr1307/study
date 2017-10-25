(function (win, $) {
    $(function () {
        $('.pm_nav').slidePlugin({
            navWrapClass : 'nav_wrap', //스크립트로 생성될 엘리먼트 클래스명 지정
            fixClass : 'fixed', // 생성된 엘리먼트에 고정 클래스명 지정
            btnsOnClass : 'on', // 네비 버튼에 on 클래스명 지정
            speed : 500 // 애니메이션 속도 지정
        });
    });
})(window, window.jQuery);