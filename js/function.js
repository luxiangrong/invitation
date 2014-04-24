jQuery.noConflict();
(function($) {
	$(function() {
		var winHeight = $(window).height();
		var winWidth = $(window).width();
		var scenesArray = ['cover', 'scene-1', 'scene-2', 'scene-3', 'scene-4', 'scene-5'];
		var current = 0;

		$(".arrow-down").click(function(e) {
			nextSence();
		});
		
		$(".arrow-up").click(function(){
			prevSence();
		});

		var nextSence = function() {
			if (current == scenesArray.length - 1) {
				return;
			}
			slideUp($("#" + scenesArray[current]));
			$("#" + scenesArray[current]).removeClass('current');
			current++;
			$("#" + scenesArray[current]).addClass('current');
		};

		var prevSence = function() {
			$("#" + scenesArray[current]).removeClass('current');
			current--;
			if (current <= 0) {
				current = 0;
				//return;
			}
			slideIn($("#" + scenesArray[current]));
			$("#" + scenesArray[current]).addClass('current');
		};
		
		//向上滑出屏幕
		var slideUp = function($elem){
			$elem.css('transform', 'translateY(-' + winHeight + 'px)');
		};
		
		//滑入屏幕
		var slideIn = function($elem){
			$elem.css('transform', 'translateY(0)');
		};
		
		var parseToMatrix = function(str) {
			var reg = /^matrix\((-?\d+),\s*(-?\d+),\s*(-?\d+),\s*(-?\d+),\s*(-?\d+),\s*(-?\d+)\)$/;
			var matches = str.match(reg);
			if($.isArray( matches) && matches.length == 7) {
				matches.splice(0,1);
				return matches;
			}
			return [0,0,0,0,0,0];
		};

		$("#stage").touchwipe({
			wipeLeft : function() {
			},
			wipeRight : function() {
			},
			wipeUp : function() {
				//手指往下滑动，页面往上滚动
				prevSence();
			},
			wipeDown : function() {
				//手指往上滑动，页面往下滚动
				nextSence();
			},
			min_move_x : 20,
			min_move_y : 20,
			preventDefaultEvents : true
		});
		
		$(".schedule").touchwipe({
			wipeLeft : function() {
				var scheduleTdWidth = $(".schedule").find('td').width();
				var params = parseToMatrix($(".schedule").css('transform'));
				var translateXValue = parseInt(params[4]);
				if(translateXValue <= $(".schedule").width() * -1 + scheduleTdWidth * 2) {
					return ;
				}
				translateXValue = translateXValue - scheduleTdWidth;
				$(".schedule").css('transform', 'translateX(' + translateXValue + 'px)');
			},
			wipeRight : function() {
				var params = parseToMatrix($(".schedule").css('transform'));
				var translateXValue = parseInt(params[4]);
				if(translateXValue >= 0) {
					return ;
				}
				translateXValue = translateXValue + $(".schedule").find('td').width();
				$(".schedule").css('transform', 'translateX(-' + Math.abs(translateXValue) + 'px)');
			},
			min_move_x : 20,
			min_move_y : 20,
			preventDefaultEvents : true
		});
		
		$("#scene-3 .avatar-box").on('click', function(){
			$("#guest-info-1").addClass('show');
			var modal = $("<div class='modal'></div>");
			modal.css({
				'position': 'fixed',
				'width': '100%',
				'height': '100%',
				'top': 0,
				'left': 0,
				'background-color': 'rgba(0,0,0,0.7)'
			});
			$("#guest-info-1").after(modal);
		});
		
		$("#scene-3 .guest-info").on('click', function(){
			$(this).removeClass('show');
			$(this).find('~ .modal').remove();
		});


		nextSence();
		nextSence();
	});
})(jQuery);
