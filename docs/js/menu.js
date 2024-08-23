$(document).ready(function() {
	// Catalog btn 
	$('.catalog-btn').on("click", function(event) {
		event.preventDefault();
		$(this).toggleClass("active");
		$("body").toggleClass("lock");
		$(".menu").toggleClass("active");
		if (!$(".menu").hasClass("z-index")) {
			$(".menu").addClass("z-index");
		} else {
			setTimeout(function() {
				$(".menu").removeClass("z-index");
			}, 300);
		}
	});

	$("[data-menu]").on("click", function (e) {
		e.preventDefault();
		$('[data-menu], [data-menu-block], [data-item], [data-item-block]').removeClass('active');
		$(this).addClass('active');
		var menu = $(this).data('menu');
		$('[data-menu-block="' + menu + '"]').toggleClass('active');
		$('[data-menu-block="' + menu + '"]').parent().toggleClass('active');
	});

	$("[data-item]").on("click", function (e) {
		e.preventDefault();
		$('[data-item]').removeClass('active');
		$(this).addClass('active');
		$('[data-item-block]').removeClass('active');
		var item = $(this).data('item');
		$('[data-item-block="' + item + '"]').toggleClass('active');
		$('[data-item-block="' + item + '"]').parent().toggleClass('active');
	});

	$(".menu__back").on("click", function (e) {
		e.preventDefault();
		let menuBack = $(this);
		menuBack.parent().parent().parent().parent().removeClass('active');
		setTimeout(function(){
			menuBack.parent().parent().parent().parent().parent().removeClass('active');
		}, 1000);
	});

});