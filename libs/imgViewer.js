/*! jQuery imgViewer - v0.6.0 - 2013-06-06
* https://github.com/waynegm/imgViewer
* Copyright (c) 2013 Wayne Mogg; Licensed MIT */
;(function($) {
	$.widget("wgm.imgViewer", {
		options: {
			zoomStep: 0.1,
			zoom: 1,
			onClick: null,
			onUpdate: null
		},
		
		_create: function() {
			var self = this;
			if (!this.element.is("img")) {
				$.error('imgviewer plugin can only be applied to img elements');
			}
//		the original img element
			self.img = self.element[0];
			var $img = $(self.img);
/*
 *		a copy of the original image to be positioned over it and manipulated to
 *		provide zoom and pan
 */
			self.zimg = $("<img/>", {"src": self.img.src}).appendTo("body").wrap("<div class='viewport'/>");
			var $zimg = $(self.zimg);
//		the container or viewport for the image view
			self.view = $(self.zimg).parent();
			var $view = $(self.view);
//		the pixel coordinate of the original image at the center of the viewport
			self.vCenter = {};
//		a flag used to decide if a mouse click is part of a drag or a proper click
			self.dragging = false;
//		a flag used to check the target image has loaded
			self.ready = false;
			$img.one("load",function() {
//			get and some geometry information about the image
				self.ready = true;
				var	width = $img.width(),
					height = $img.height(),
					offset = $img.offset();
//			cache the image padding information
					self.offsetPadding = {
							top: parseInt($img.css('padding-top'),10),
							left: parseInt($img.css('padding-left'),10),
							right: parseInt($img.css('padding-right'),10),
							bottom: parseInt($img.css('padding-bottom'),10)
					};
/*
 *			cache the image margin/border size information
 *			because of IE8 limitations left and right borders are assumed to be the same width 
 *			and likewise top and bottom borders
 */
					self.offsetBorder = {
							x: Math.round(($img.outerWidth()-$img.innerWidth())/2),
							y: Math.round(($img.outerHeight()-$img.innerHeight())/2)
					};
/*
 *			define the css style for the view container using absolute positioning to
 *			put it directly over the original image
 */
					var vTop = offset.top + self.offsetBorder.y + self.offsetPadding.top,
						vLeft = offset.left + self.offsetBorder.x + self.offsetPadding.left;

					$view.css({
								position: "absolute",
								overflow: "hidden",
								top: vTop+"px",
								left: vLeft+"px",
								width: width+"px",
								height: height+"px"
					});
//			the zoom and pan image is position relative to the view container
					$zimg.css({
								position: "relative",
								top: 0+"px",
								left: 0+"px",
								width: width+"px",
								height: height+"px"
					});
//			the initial view is centered at the orignal image
					self.vCenter = {
									x: width/2,
									y: height/2
					};
					self.update();
			}).each(function() {
				if (this.complete) { $(this).load(); }
			});
/*
 *		Mousewheel event handler for image zooming
 */					
			$zimg.mousewheel(function(event, delta) {
				event.preventDefault();
				self.options.zoom -= delta * self.options.zoomStep;
				self.update();
			});
/*
 *		Mouse drag handler for image panning
 */
			$zimg.mousedown( function(e) {
				e.preventDefault();
				var last = e;
				$zimg.mousemove( function(e) {
					e.preventDefault();
					self.dragging = true;
					self.vCenter.x = self.vCenter.x - (e.pageX - last.pageX)/self.options.zoom;
					self.vCenter.y = self.vCenter.y - (e.pageY - last.pageY)/self.options.zoom;
					last = e;
					self.update();
				});
				function endDrag(e) {
					e.preventDefault();
					setTimeout(function() {	self.dragging = false; }, 0);
					$zimg.unbind("mousemove");
					$zimg.unbind("mouseup");
					$(document).unbind("mouseup");
				}
				$(document).one("mouseup", endDrag);
				$zimg.one("mouseup", endDrag);
			});
/*
 *		Mouse click handler - supply an action by defining the onClick option
 */
			$zimg.click(function(e) {
				if (!self.dragging) {
					self._trigger("onClick", e, self);
				}
			});
/*
 *		Window resize handler
 */
	
			$(window).resize(function() {
/*
 *			the aim is to keep the view centered on the same location in the original image
 */
				if (self.ready) {
					self.vCenter.x *=$img.width()/$view.width();
					self.vCenter.y *= $img.height()/$view.height(); 
					self.update();
				}
			});
		},
/*
 *	Remove the plugin
 */  
		destroy: function() {
			var $zimg = $(this.zimg);
			$zimg.unbind("click");
			$zimg.unmousewheel();
			$(window).unbind("resize");
			$zimg.remove();
			$(this.view).remove();
			$.Widget.prototype.destroy.call(this);
		},
  
		_setOption: function(key, value) {
			switch(key) {
				case 'zoom':
					if (parseFloat(value) < 1 || isNaN(parseFloat(value))) {
						return;
					}
					break;
				case 'zoomStep':
					if (parseFloat(value) <= 0 ||  isNaN(parseFloat(value))) {
						return;
					}
					break;
			}
			var version = $.ui.version.split('.');
			if (version[0] > 1 || version[1] > 8) {
				this._super(key, value);
			} else {
				$.Widget.prototype._setOption.apply(this, arguments);
			}
			switch(key) {
				case 'zoom':
					if (this.ready) {
						this.update();
					}
					break;
			}
		},
		
		addElem: function(elem) {
			$(this.view).append(elem);
		},
/*
 *	Test if a relative image coordinate is visible in the current view
 */
		isVisible: function(relx, rely) {
			var view = this.getView();
			if (view) {
				return (relx >= view.left && relx <= view.right && rely >= view.top && rely <= view.bottom);
			} else {
				return false;
			}
		},
/*
 *	Get relative image coordinates of current view
 */
		getView: function() {
			if (this.ready) {
				var $img = $(this.img),
					width = $img.width(),
					height = $img.height(),
					zoom = this.options.zoom;
				return {
					top: this.vCenter.y/height - 0.5/zoom,
					left: this.vCenter.x/width - 0.5/zoom,
					bottom: this.vCenter.y/height + 0.5/zoom,
					right: this.vCenter.x/width + 0.5/zoom
				};
			} else {
				return null;
			}
		},
/*
 *	Pan the view to be centred at the given relative image location
 */
		panTo: function(relx, rely) {
			if ( this.ready && relx >= 0 && relx <= 1 && rely >= 0 && rely <=1 ) {
				var $img = $(this.img),
					width = $img.width(),
					height = $img.height();
				this.vCenter.x = relx * width;
				this.vCenter.y = rely * height;
				this.update();
				return { x: this.vCenter.x/width, y: this.vCenter.y/height };
			} else {
				return null;
			}
		},
/*
 *	Convert a relative image location to a viewport pixel location
 */  
		imgToView: function(relx, rely) {
			if ( this.ready && relx >= 0 && relx <= 1 && rely >= 0 && rely <=1 ) {
				var $img = $(this.img),
					width = $img.width(),
					height = $img.height();
				var zLeft = width/2 - this.vCenter.x * this.options.zoom;
				var zTop =  height/2 - this.vCenter.y * this.options.zoom;
				var vx = relx * width * this.options.zoom + zLeft;
				var vy = rely * height * this.options.zoom + zTop;
				return { x: Math.round(vx), y: Math.round(vy) };
			} else {
				return null;
			}
		},
/*
 *	Convert a relative image location to a page pixel location
 */  
		imgToCursor: function(relx, rely) {
			var pos = this.imgToView(relx, rely);
			if (pos) {
				var offset = $(this.img).offset();
				pos.x += offset.left + this.offsetBorder.x + this.offsetPadding.left;
				pos.y += offset.top + this.offsetBorder.y + this.offsetPadding.top;
				return pos;
			} else {
				return null;
			}
		},
/*
 *	Convert a viewport pixel location to a relative image coordinate
 */		
		viewToImg: function(vx, vy) {
			if (this.ready) {
				var $img = $(this.img),
					width = $img.width(),
					height = $img.height();
				var zLeft = width/2 - this.vCenter.x * this.options.zoom;
				var zTop =  height/2 - this.vCenter.y * this.options.zoom;
				var relx= (vx - zLeft)/(width * this.options.zoom);
				var rely = (vy - zTop)/(height * this.options.zoom);
				if (relx>=0 && relx<=1 && rely>=0 && rely<=1) {
					return {x: relx, y: rely};
				} else {
					return null;
				}
			} else {
				return null;
			}
		},
		
/*
 *	Convert a page pixel location to a relative image coordinate
 */		
		cursorToImg: function(cx, cy) {
			if (this.ready) {
				var $img = $(this.img),
					width = $img.width(),
					height = $img.height(),
					offset = $img.offset();
				var zLeft = width/2 - this.vCenter.x * this.options.zoom;
				var zTop =  height/2 - this.vCenter.y * this.options.zoom;
				var relx = (cx - offset.left - this.offsetBorder.x - this.offsetPadding.left- zLeft)/(width * this.options.zoom);
				var rely = (cy - offset.top - this.offsetBorder.y - this.offsetPadding.top - zTop)/(height * this.options.zoom);
				if (relx>=0 && relx<=1 && rely>=0 && rely<=1) {
					return {x: relx, y: rely};
				} else {
					return null;
				}
			} else {
				return null;
			}
		},
/*
 *	Adjust the display of the image  
 */
		update: function() {
			if (this.ready) {
				var zTop, zLeft, zWidth, zHeight,
					$img = $(this.img),
					width = $img.width(),
					height = $img.height(),
					offset = $img.offset(),
					zoom = this.options.zoom,
					half_width = width/2,
					half_height = height/2;
  
				if (zoom <= 1) {
					zTop = 0;
					zLeft = 0;
					zWidth = width;
					zHeight = height;
					this.vCenter = { 
									x: half_width,
									y: half_height
					};
					this.options.zoom = 1;
				} else {
					zTop = Math.round(half_height - this.vCenter.y * zoom);
					zLeft = Math.round(half_width - this.vCenter.x * zoom);
					zWidth = Math.round(width * zoom);
					zHeight = Math.round(height * zoom);
/*
 *			adjust the view center so the image edges snap to the edge of the view
 */
					if (zLeft > 0) {
						this.vCenter.x = half_width/zoom;
						zLeft = 0;
					} else if (zLeft+zWidth < width) {
						this.vCenter.x = width - half_width/zoom ;
						zLeft = width - zWidth;
					}
					if (zTop > 0) {
						this.vCenter.y = half_height/zoom;
						zTop = 0;
					} else if (zTop + zHeight < height) {
						this.vCenter.y = height - half_height/zoom;
						zTop = height - zHeight;
					}
				}
				var vTop = Math.round(offset.top + this.offsetBorder.y + this.offsetPadding.top),
					vLeft = Math.round(offset.left + this.offsetBorder.x + this.offsetPadding.left);
				$(this.view).css({
								top: vTop+"px",
								left: vLeft+"px",
								width: width+"px",
								height: height+"px"
				});
				$(this.zimg).css({
								left: zLeft+"px",
								top: zTop+"px",
								width: zWidth+"px",
								height: zHeight+"px"
				});
/*
 *		define the onUpdate option to do something after the image is redisplayed
 *		probably shouldn't pass out the this object - need to think of something better
 */
				this._trigger("onUpdate", null, this);
			}
		}
	});
})(jQuery);
