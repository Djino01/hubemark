$(document).ready(function() {
	// Filter top
	$(".filter-top__btn--list").on("click", function(){
		$(".filter-top__btn").removeClass("active");
		$(this).addClass("active");
		$(this).parents().find(".catalog-page__wrap").removeClass("catalog--list");
		$(this).parents().find(".catalog-page__wrap").find(".recommendations-card").removeClass("card--list");
	});
	$(".filter-top__btn--grid").on("click", function(){
		$(".filter-top__btn").removeClass("active");
		$(this).addClass("active");
		$(this).parents().find(".catalog-page__wrap").addClass("catalog--list");
		$(this).parents().find(".catalog-page__wrap").find(".recommendations-card").addClass("card--list");
	});

	// Filter custom select
	$('.filter-select').on("click", function(event) {
		if($(event.target).closest('.filter-select__hidden').length === 0) {
			$('.filter-select').not(this).removeClass('active').find('.filter-select__hidden').removeClass('active');
			$(this).toggleClass('active');
			$(this).find('.filter-select__hidden').toggleClass('active');
		}
	});
	$(".filter-select__hidden").on("click", function(event) {
		event.stopPropagation();
	});
	$(document).on("click", function(e) {
		if (!$(e.target).is(".filter-select *")) {
			$('.filter-select').removeClass('active');
			$('.filter-select__hidden').removeClass('active');
		};
	});

	// Filter open
	$('.all-filters').on("click", function(event) {
		event.preventDefault();
		$("body").addClass("body-bg");
		$(".filter").addClass("active");
	});

	// Filter closed
	$('.filter__closed').on("click", function(event) {
		event.preventDefault();
		$("body").removeClass("body-bg");
		$(".filter").removeClass("active");
	});
	$(function ($) {
		$(document).mouseup(function (e) {
		var div = $(".filter.active");
		if (!div.is(e.target) && div.has(e.target).length === 0) {
				div.removeClass("active");
				$("body").removeClass("body-bg");
			}
		});
	});

	// Focus
	if ($(".form__field").length > 0) {
		$('.form__label').on('mousedown touchstart', function(e) {
			e.stopPropagation();
		});
		$(".form__field").each(function () {
			let value = $(this).val();
			if (value.length > 0) {
				$(this).parent().find('.form__caption').addClass("active");
			}
		});
		$('.form__field').on('focus', function () {
			$(this).parent().find('.form__caption').addClass("active");
		});
		$('.form__field').on('blur', function () {
			let value = $(this).val();
			if (value.length == 0) {
				$(this).parent().find('.form__caption').removeClass("active");
			} else {
				$(this).parent().find('.form__caption').addClass("active");
			}
		});
	}

	// Like
	$(".like--js").on("click", function () {
		$(this).toggleClass("active");
	});

});