$(document).ready(function() {
	var swiper = new Swiper(".product__min-swiper", {
		slidesPerView: 4,
		spaceBetween: 8,
		direction: getDirection(),
		watchSlidesProgress: true,
		navigation: {
			nextEl: ".product__min-swiper .arrow_next",
			prevEl: ".product__min-swiper .arrow_prev",
		},
		on: {
			resize: function () {
				swiper.changeDirection(getDirection());
			},
		},
		breakpoints: {
			220: {
				slidesPerView: 4,
				spaceBetween: 8,
			},
			680: {
				slidesPerView: 4,
				spaceBetween: 8,
			},
			760: {
				slidesPerView: 4,
				spaceBetween: 8,
			},
			1010: {
				slidesPerView: 4,
				spaceBetween: 8,
			},
		},
	});

	function getDirection() {
		var windowWidth = window.innerWidth;
		var direction = window.innerWidth <= 1010 ? 'horizontal' : 'vertical';
		return direction;
	}

	var swiper2 = new Swiper(".product__big-swiper", {
		slidesPerView: 1,
		spaceBetween: 4,
		effect: "fade",
		thumbs: {
			swiper: swiper,
		},
	});

	var swiperColors = new Swiper(".product-colors__swiper", {
		slidesPerView: 4.5,
		spaceBetween: 8,
		breakpoints: {
			220: {
				slidesPerView: 4,
				spaceBetween: 8,
			},
			680: {
				slidesPerView: 4,
				spaceBetween: 8,
			},
			760: {
				slidesPerView: 4,
				spaceBetween: 8,
			},
			1010: {
				slidesPerView: 4.5,
				spaceBetween: 8,
			},
		},
	});

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

	$(".product-params__coll-value--copy").on("click", function () {
		var text = $(this).find("span").text();
		var input = $('<textarea>').val(text).appendTo('body').select();
		document.execCommand('copy');
		input.remove();
		$(".vendor-code").addClass("active");
		setTimeout(() => {
			$(".vendor-code").removeClass("active");
		}, 3000);
	});

	$(".link").on("click", function () {
		var elementClick = $(this).attr('href');
		var destination = $(elementClick).offset().top - 100;
		jQuery('html:not(:animated),body:not(:animated)').animate(
			{ scrollTop: destination },
			600
		);
		return false;
	});

	$(".sortings__btn--js").on("click", function (e) {
		e.preventDefault();
		$(this).parent().find(".sortings__btn--js").removeClass('active');
		$(this).addClass('active');
	});

	$(".like--js").on("click", function () {
		$(this).toggleClass("active");
	});

	if ($(".questions-form").length > 0) {
		let questionField = $('.questions-form__field--js');
		questionField.on('click', function() {
			$(".questions-form__block").slideDown(100);
		});
		$(".questions-form__btn--cancel").on('click', function(e) {
			e.preventDefault();
			$(".questions-form__block").slideUp(100);
		});
		let maxChars = 1000;
		questionField.on('input', function() {
			let text = $(this).val();
			var charCount = text.length;

			if(charCount > maxChars) {
				$(this).val(text.substring(0, maxChars));
				charCount = maxChars;
				alert("Достигнуто максимальное число символов!");
			}

			$('.questions-form__symbols span').text(charCount);
		});
	}

	if ($('[data-fancybox]').length > 0) {
		$('[data-fancybox="gallery"]').fancybox({
			loop: false,
			baseClass: 'dark-fancybox',
			touch: false,
			infobar: false,
			buttons : [
				'close'
			],
			thumbs : {
				autoStart : true,
				axis      : 'y'
			}
		});
		$('[data-fancybox="gallery-1"]').fancybox({
			loop: false,
			baseClass: 'dark-fancybox',
			touch: false,
			infobar: false,
			buttons : [
				'close'
			],
			thumbs : {
				autoStart : true,
				axis      : 'y'
			}
		});
	}
});