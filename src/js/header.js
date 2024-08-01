if ($(".header").length > 0) {
	$(window).on('resize', function () {
		var new_width = $(".page").outerWidth();
		var min_width = 680;
		if (new_width <= min_width) {
			$('.catalog-btn').insertAfter($('.logo'));
		}
		if (new_width > min_width) {
			$('.catalog-btn').insertBefore($('.search'));
		}
	}).trigger('resize');
}