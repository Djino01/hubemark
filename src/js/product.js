var swiper = new Swiper(".product__min-swiper", {
	slidesPerView: 4,
	spaceBetween: 8,
	direction: "vertical",
	watchSlidesProgress: true,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
});

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
});