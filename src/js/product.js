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