$("[data-tab]").on("click", function (e) {
	e.preventDefault();
	$("[data-tab]").removeClass('active');
	$("[data-block]").removeClass('active');
	var tab = $(this).data('tab');
	$('[data-tab="' + tab + '"]').addClass('active');
	$('[data-block="' + tab + '"]').addClass('active');
});