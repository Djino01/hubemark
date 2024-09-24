$(document).ready(function() {
	// Catalog btn 
	$('.catalog-btn').on("click", function(event) {
		event.preventDefault();
		$(this).toggleClass("active");
		$("body").toggleClass("menu-lock");
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
		$('[data-menu], [data-item]').parent().removeClass('active');
		$('[data-menu-block], [data-item-block]').removeClass('active');
		$(this).parent().addClass('active');
		var menu = $(this).data('menu');
		$('[data-menu-block="' + menu + '"]').toggleClass('active');
		$('[data-menu-block="' + menu + '"]').parent().toggleClass('active');
	});

	$("[data-item]").on("click", function (e) {
		e.preventDefault();
		$('[data-item]').parent().removeClass('active');
		$(this).parent().addClass('active');
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

	
	if ($(".header-nav-menu").length > 0) {
		let headerUserItem = $(".header-nav-user-item");
		let headerUser = $(".header-nav-user");
		let headerMenu = $(".header-nav-menu");
		let headerMenuClosed = $(".header-nav-menu__closed");
	
		headerUserItem.on("click", function (e) {
			e.preventDefault();
			headerMenu.toggleClass("active");
		});

		headerMenuClosed.on("click", function (e) {
			e.preventDefault();
			headerMenu.removeClass("active");
		});
	
		$(document).on("click", function (e) {
			if (!headerUser.is(e.target) && headerUser.has(e.target).length === 0) {
				headerMenu.removeClass("active");
			}
		});
	}

});