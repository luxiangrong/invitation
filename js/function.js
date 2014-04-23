jQuery.noConflict();
(function($) {
	$(function() {
		var scenesArray = ['cover', 'scene-1'];
		var current = 0;
		
		$("#stage").touchwipe({
			wipeLeft : function() {
			},
			wipeRight : function() {
			},
			wipeUp : function() {
				$("#" + scenesArray[current]).addClass('slidedown');
				$("#" + scenesArray[current]).removeClass('current');
				current --;
				if(current <= 0) {
					current = 0 ;
					return;
				}
				$("#" + scenesArray[current]).addClass('current');
				
			},
			wipeDown : function() {
				$("#" + scenesArray[current]).addClass('slideup');
				$("#" + scenesArray[current]).removeClass('current');
				current ++;
				if(current >= scenesArray.length) {
					current = scenesArray.length - 1;
					return;
				}
				$("#" + scenesArray[current]).addClass('current');
				
			},
			min_move_x : 20,
			min_move_y : 20,
			preventDefaultEvents : true
		});
		
		$("#stage").click(function(){
			
		});
	});
})(jQuery);
