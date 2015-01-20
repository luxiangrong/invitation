jQuery.noConflict();
(function($) {
	$(function() {
		$(document).ready(function(){
		
			var winHeight = $(window).height();
			var winWidth = $(window).width();
			var scenesArray = ['cover', 'scene-1', 'scene-3', 'scene-2'];
			var current = 0;
	
			$(".arrow-down").click(function(e) {
				prevSence();
			});
			
			$(".arrow-up").click(function(){
				nextSence();
			});
	
			var nextSence = function() {
				if (current == scenesArray.length - 1) {
					$(".adv").css({
						'transform': 'translateY(-' + winHeight * 0.9 + 'px)'
					});
					return;
				}
				slideUp($("#" + scenesArray[current]));
				$("#" + scenesArray[current]).removeClass('current');
				current++;
				$("#" + scenesArray[current]).addClass('current');
				
				showArraw();
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
				
				showArraw();
			};
			
			var showArraw = function(){
				if($(".current").attr('id') == 'cover') {
					 $(".arrow-down").hide();
					 $(".arrow-up").hide();
					 return;
				}
				if($(".current").attr('id') == 'scene-2') {
					$(".arrow-up").hide();
					$(".arrow-down").show();
				} else {
					$(".arrow-down").show();
					$(".arrow-up").show();
				}
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
			
			$(".adv").touchwipe({
				wipeUp : function() {
					$(".adv").css({
						'transform': 'translateY(-40px)'
					});
				},
				wipeDown : function() {
					$(".adv").css({
						'transform': 'translateY(-' + winHeight * 0.9 + 'px)'
					});
				},
				min_move_x : 10,
				min_move_y : 10,
				preventDefaultEvents : true
			});
			
			$(".adv").click(function(){
				$(".adv").css({
					'transform': 'translateY(-' + winHeight * 0.9 + 'px)'
				});
			});
	
			$("#stage").touchwipe({
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
			
			//嘉宾列表根据元素个数自适应高度，垂直居中显示
			$("#scene-3 .ver-center").each(function(index, item){
				var liCount = $(this).find('li').size();
				var percent = 1 / liCount * 100;
				
				var startTop = 100 - 25 * liCount;
				$(this).find('li').each(function(index2, item2){
					$(this).css('top', startTop / 2 + 23* index2  + '%');
				});
			});
			
			$("#guest-list2").css('transform', 'translateX(' + winWidth + 'px)' + ' translateY(-' + winHeight + 'px)');
			
			$("#scene-3").touchwipe({
				wipeUp : function() {
					//手指往下滑动，页面往上滚动
					prevSence();
				},
				wipeDown : function() {
					//手指往上滑动，页面往下滚动
					nextSence();
				},
				wipeLeft : function() {
					$("#guest-list1").css('transform', 'translateX(-' + winWidth + 'px)' + ' translateY(0px)');
					$("#guest-list2").css('transform', 'translateX(0px)' + ' translateY(-' + winHeight + 'px)');
				},
				wipeRight : function() {
					$("#guest-list1").css('transform', 'translateX(0px)' + ' translateY(0px)');
					$("#guest-list2").css('transform', 'translateX(' + winWidth + 'px)' + ' translateY(-' + winHeight + 'px)');
				},
				min_move_x : 20,
				min_move_y : 20,
				preventDefaultEvents : true
			});
			
			$("#scene-3 .avatar").on('click', function(){
				var target = $(this).attr('data-target');
				$(target).removeClass('hide');
				$(target).addClass('show');
				$("#scene-3 .guest-info-wrap").css('top', 0);
				$("#scene-3 .guest-info-wrap").css('left', 0);
				var modal = $("<div class='modal'></div>");
				modal.css({
					'position': 'fixed',
					'width': '100%',
					'height': '100%',
					'top': 0,
					'left': 0,
					'background-color': 'rgba(0,0,0,0.7)'
				});
				$(target).after(modal);
			});
			
			$("#scene-3 .guest-info-wrap").on('click', function(){
				$(".guest-info").addClass('hide');
				$(".guest-info").removeClass('show');
				window.setTimeout(function(){
					$("#scene-3 .guest-info-wrap").css('top', winHeight);
				}, 1000);
				
				$(".guest-info").find('~ .modal').remove();
			});
	
			//广告
			$(".adv-list").find('.adv-item').innerWidth($(".adv").width());
			$(".adv-list").touchwipe({
				wipeLeft : function() {
					slideLeft($(".adv-list"), $(".adv-list").find('td').width());
				},
				wipeRight : function() {
					slideRight($(".adv-list"), $(".adv-list").find('td').width());
				},
				min_move_x : 20,
				min_move_y : 20,
				preventDefaultEvents : true,
				stopPropagation: false
			});
			
			$(".adv-list").click(function(){
				slideLeft((".adv-list"), $(".adv-list").find('td').width());
			});
			
			/**
			 * 向左滑动
			 * 
			 * @param {jQury Object} $elem 需要滑动的元素， jquery包装对象
			 * @param {Number} $step 每次滑动的距离
			 */
			var slideLeft = function(elem, $step){
				var $elem = $(elem);
				var params = parseToMatrix($elem.css('transform'));
				var translateXValue = parseInt(params[4]);
				var num = Math.floor(winWidth / $step);
				if(translateXValue <= $elem.width() * -1 + $step * num) {
					return ;
				}
				translateXValue = translateXValue - $step;
				if(translateXValue <= $elem.width() * -1 + $step * num ) {
					$elem.closest('.slider').find('.next').removeClass('active');
				} 
				$elem.closest('.slider').find('.prev').addClass('active');
				$elem.css('transform', 'translateX(' + translateXValue + 'px)');
			};
			
			/**
			 * 向右滑动
			 * 
			 * @param {jQury Object} $elem 需要滑动的元素， jquery包装对象
			 * @param {Number} $step 每次滑动的距离
			 */
			var slideRight = function(elem, $step){
				var $elem = $(elem);
				var params = parseToMatrix($elem.css('transform'));
				var translateXValue = parseInt(params[4]);
				if(translateXValue >= 0) {
					return ;
				}
				translateXValue = translateXValue + $step;
				if(translateXValue >= 0) {
					$elem.closest('.slider').find('.prev').removeClass('active');
				} 
				$elem.closest('.slider').find('.next').addClass('active');
				$elem.css('transform', 'translateX(-' + Math.abs(translateXValue) + 'px)');
			};
			
			var responseToWindow = function(){
				$("#scene-2 .schedule td h2, #scene-2 .schedule td p").width(winWidth * 0.3);
				$("#scene-2 .schedule td h2").height(winWidth * 0.3 * 0.3);
				$("#scene-2 .schedule td p").height(winWidth * 0.3 * 0.7);
			};
			responseToWindow();
			
			var openDialog = function(id) {
				$("#" + id).show();
				$("#" + id).find('.close').on('click', function(){
					$("#" + id).hide();
				});
			};
			
			$("#sign-up").click(function(){
				openDialog('sign-up-dialog');
			});
			
		});
	});
})(jQuery);
