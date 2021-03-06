/**
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch and iPad, should also work with Android mobile phones (not tested yet!)
 * Common usage: wipe images (left and right to show the previous or next image)
 *
 * @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 * @version 1.1.1 (9th December 2010) - fix bug (older IE's had problems)
 * @version 1.1 (1st September 2010) - support wipe up and wipe down
 * @version 1.0 (15th July 2010)
 */
(function($) {
	$.fn.touchwipe = function(settings) {
		var config = {
			min_move_x : 20,
			min_move_y : 20,
			wipeLeft : function() {
			},
			wipeRight : function() {
			},
			wipeUp : function() {
			},
			wipeDown : function() {
			},
			preventDefaultEvents : true,
			stopPropagation : true,
			simulate : true
		};

		if(settings)
			$.extend(config, settings);

		this.each(function() {
			var $this = $(this);
			var startX;
			var startY;
			var isMoving = false;

			function cancelTouch() {
				this.removeEventListener('touchmove', onTouchMove);
				startX = null;
				isMoving = false;
			}

			function onTouchMove(e) {
				if(config.preventDefaultEvents) {
					e.preventDefault();
				}
				if(config.stopPropagation) {
					$.Event(e).stopPropagation();
				}
				if(isMoving) {
					if(e.touches && e.touches.length == 1) {
						var x = e.touches[0].clientX;
						var y = e.touches[0].clientY;
					} else if(config.simulate) {
						var x = e.originalEvent.screenX;
						var y = e.originalEvent.screenY;
					}
					var dx = startX - x;
					var dy = startY - y;
					if(Math.abs(dx) >= config.min_move_x) {
						cancelTouch();
						if(dx > 0) {
							config.wipeLeft();
						} else {
							config.wipeRight();
						}
					} else if(Math.abs(dy) >= config.min_move_y) {
						cancelTouch();
						if(dy > 0) {
							config.wipeDown();
						} else {
							config.wipeUp();
						}
					}
				}
			}
			
			function onTouchEnd(e) {
				isMoving = false;
			}

			function onTouchStart(e) {
				if(config.stopPropagation) {
					$.Event(e).stopPropagation();
				}
				if(e.touches && e.touches.length == 1) {
					startX = e.touches[0].clientX;
					startY = e.touches[0].clientY;
				} else if(config.simulate) {
					startX = e.originalEvent.screenX;
					startY = e.originalEvent.screenY;
				}
				
				isMoving = true;
				if('ontouchmove' in document.documentElement) {
					this.addEventListener('touchmove', onTouchMove, false);
				} else {
					if(config.simulate) {
						$this.off('mousemove').on('mousemove', onTouchMove);
					}
				}
				if('ontouchend' in document.documentElement) {
					
				} else {
					if(config.simulate) {
						$this.off('mouseup').on('mouseup', onTouchEnd);
					}
				}
			}

			if('ontouchstart' in document.documentElement) {
				this.addEventListener('touchstart', onTouchStart, false);
			} else {
				if(config.simulate) {
					$this.off('mousedown').on('mousedown', onTouchStart);
				}
			}
		});

		return this;
	};

})(jQuery);
