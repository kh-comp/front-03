// ::::::::::::::::::::::::: 공통 제이쿼리

//::::::::::::::::::::: LNB
$(document).ready(function() {
    $('.btn-lnb-open').on('click', function(e) {
        e.preventDefault();

        // 1) 버튼 자체 상태 (필요하면 유지)
        $(this).toggleClass('active');

        // 2) LNB를 접거나 펼치기
        $('.lnb-wrap').toggleClass('active'); 
        // 이 active는 위에서 말한 "width:0; transform:-240px;" 상태랑 연결

        // 3) 본문을 100%로 늘리기
        $('.sub-container-wrap').toggleClass('full');
        // 이 full은 위에서 말한 "width:100%; float:none;" 랑 연결
    });
});


/*     toggle-group     */
	$(document).on("click",".toggle-group li",function(){
		
		$(this).closest(".toggle-group").find("li").removeClass("on");
		$(this).addClass("on");
		
	});
	
    /*     toggles-group     */
	$(document).on("click",".toggles-group li",function(){
		
        $(this).toggleClass("on");
		
	});

	// btn-toggle    
    
	$(document).on("click",".btn-toggle",function(){

		if( $(this).parents('.menu-wrapper') < 1 ){
            $(this).toggleClass("on");
		}
	});


// ::::::::::::::::::::::::::: Tab Menu
    function tab(e, num) {
        var num = num || 0;
        var menu = $(".sub-tab-wrap > ul").children();
        var con = $(".sub-tab-wrap").children();
        var select = $(menu).eq(num);
        var i = num;

        select.addClass('on');
        con.eq(num).show();

        menu.click(function () {
            if (select !== null) {
                select.removeClass("on");
                con.eq(i).hide();
            }

            select = $(this);
            i = $(this).index();
            

            select.addClass('on');
            con.eq(i).show().addClass('on');
        });
    }


//:::::::::::::::::::::::::: LNB Menu
(function($){
    var lnbUI = {
        click : function(target, speed) {
            var _self = this,
                $target = $(target);
            _self.speed = speed || 300;

            $target.on('click','> a', function(e){
                e.preventDefault();
                e.stopPropagation();

                var $this = $(this),
                    $parentLi = $this.parent('li'),
                    $depthTarget = $this.next('.dep2'),
                    $siblings = $parentLi.siblings('.dep1-1');

                // 다른 1depth 닫기
                $siblings.removeClass('on');
                $siblings.find('.dep2').slideUp(_self.speed);

                // 현재 열기 / 닫기
                if($depthTarget.length){
                    if($depthTarget.is(':visible')){
                        $depthTarget.slideUp(_self.speed);
                        $parentLi.removeClass('on');
                    } else {
                        $depthTarget.slideDown(_self.speed);
                        $parentLi.addClass('on');
                    }
                }
            });

            // 초기화: 전체 닫고, on만 열기
            $('.left-menu .dep1-1 > .dep2').hide();
            $('.left-menu .dep1-1.on > .dep2').show();
        }
    }

    $(function(){
        lnbUI.click('.left-menu .dep1-1', 300);
    });
}(jQuery));