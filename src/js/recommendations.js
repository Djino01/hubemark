var swiper = new Swiper(".recommendations-swiper", {
	slidesPerView: 6,
	spaceBetween: 16,
	speed: 1000,
	iOSEdgeSwipeDetection: true,
	breakpoints: {
		220: {
			slidesPerView: 1.6,
			slidesPerGroup: 1,
			spaceBetween: 8,
		},
		450: {
			slidesPerView: 2,
			spaceBetween: 8,
		},
		680: {
			slidesPerView: 3,
			spaceBetween: 8,
		},
		760: {
			slidesPerView: 4,
			spaceBetween: 10,
		},
		1010: {
			slidesPerView: 5,
			spaceBetween: 16,
		},
		1270: {
			slidesPerView: 6,
			spaceBetween: 16,
		}
	},
});