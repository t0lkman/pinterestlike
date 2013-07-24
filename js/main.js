(function($) {
	var columns = 0,
		rows = 0,
		colWidth = 300,
		colMargin = 10,
		residualSpace = 0,
		windowWidth = 0,
		blockArrs = [],
		wrapperMinWidth = parseInt($('html').css('min-width'), 10),
		boxes = {}, 
		wrapper = {};

	var init = function() {
		wrapper = $('#wrapper');
		boxes = $('.smart_box');
		boxes.each(function(i) {
			$(this).click(function(e){
				window.location.href = $(this).data('href');
			});
		});
	}

	var setup = function() {
		var windowWidth = $(window).width();
		windowWidth = (wrapperMinWidth > windowWidth) ? wrapperMinWidth : windowWidth;
		columns = Math.floor(windowWidth / (colWidth + colMargin * 2));
		rows = Math.ceil(boxes.length/columns);
		residualSpace = (windowWidth - ((colWidth * columns) + (colMargin * (columns - 1)))) / 2 - 10;
		blockArrs = []; // empty array
		for (var i = 0; i < columns; i++) {
			blockArrs.push(colMargin);
		}
		position();
	}

	var position = function() {
		wrapper.height(rows * boxes.outerHeight() + 70); // set the wrapper height according to the number of boxes
		boxes.each(function(i) {
			var min = Math.min.apply(Math, blockArrs); // get minimum value from the array
			var index = $.inArray(min, blockArrs);
			var leftPos = colMargin + (index * (colWidth + colMargin));
			this.style.left =  (leftPos + residualSpace) + 'px';
			this.style.top = min + 'px';
			blockArrs[index] = min + $(this).outerHeight() + colMargin;
		});
	}

	//init on dom ready
	$(function() {
		init(); // fire on page load
		setup(); // fire on page load
		$(window).resize(setup); // fire on page resize
	});
}(jQuery));