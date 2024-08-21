$(document).ready(function() {
	// Catalog btn 
	$('.catalog-btn').on("click", function(event) {
		event.preventDefault();
		$(this).toggleClass("active");
		$("body").toggleClass("lock");
		$(".menu").toggleClass("active");
	});

	$("[data-menu]").on("click", function (e) {
		e.preventDefault();
		$('[data-menu], [data-menu-block], [data-item], [data-item-block]').removeClass('active');
		$(this).addClass('active');
		var menu = $(this).data('menu');
		$('[data-menu-block="' + menu + '"]').toggleClass('active');
	});

	$("[data-item]").on("click", function (e) {
		e.preventDefault();
		$('[data-item]').removeClass('active');
		$(this).addClass('active');
		$('[data-item-block]').removeClass('active');
		var item = $(this).data('item');
		$('[data-item-block="' + item + '"]').toggleClass('active');
	});

});