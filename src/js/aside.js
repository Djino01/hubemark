if ($(".aside").length > 0) {
	$(window).on('resize', function () {
		var new_width = $(".page").outerWidth();
		var min_width = 1200;
		if (new_width <= min_width) {
			$('.aside').insertAfter($('.product__header'));
		}
		if (new_width > min_width) {
			$('.aside').insertAfter($('.catalog__wrap'));
		}
	}).trigger('resize');
}