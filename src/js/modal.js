$(document).ready(function() {

    function triggerResizeEvent() {
        var mainBody = document.body;
        var originalWidth = mainBody.style.width;
        mainBody.style.width = (mainBody.offsetWidth + 1) + 'px';
        window.dispatchEvent(new Event('resize'));
        setTimeout(function() {
            mainBody.style.width = originalWidth;
            window.dispatchEvent(new Event('resize'));
        }, 10);
    }

    function initializeMainSwipers() {
        $('.product-modal-big__swiper').each(function(index, element) {
            var swiperInstance = new Swiper(element, {
                slidesPerView: 1,
                spaceBetween: 4,
                effect: "fade",
                watchSlidesProgress: true,
                navigation: {
                    nextEl: $(element).closest('.product-modal').find('.product-modal-arrow_next')[0],
                    prevEl: $(element).closest('.product-modal').find('.product-modal-arrow_prev')[0],
                },
                thumbs: {
                    swiper: $(element).closest('.product-modal').find('.product-modal-small__swiper').data('swiper-instance'),
                },
                on: {
                    init: function() {
                        this.update();
                    },
                    slideChange: function() {
                        var thumbsSwiper = $(element).closest('.product-modal').find('.product-modal-small__swiper').data('swiper-instance');
                        if (thumbsSwiper) {
                            var activeIndex = this.activeIndex;
                            thumbsSwiper.slideTo(activeIndex); // Прокрутка мини-слайдера до активного слайда
                        }
                    }
                }
            });

            $(element).data('swiper-instance', swiperInstance);
        });
    }

    function initializeThumbSwipers() {
        $('.product-modal-small__swiper').each(function(index, element) {
            var swiperInstance = new Swiper(element, {
                slidesPerView: 6,
                spaceBetween: 4,
                breakpoints: {
                    220: { slidesPerView: 3, spaceBetween: 4 },
                    350: { slidesPerView: 4, spaceBetween: 4 },
                    460: { slidesPerView: 5, spaceBetween: 4 },
                    520: { slidesPerView: 6, spaceBetween: 4 },
                    680: { slidesPerView: 4, spaceBetween: 4 },
                    760: { slidesPerView: 5, spaceBetween: 4 },
                    1010: { slidesPerView: 6, spaceBetween: 4 },
                },
                on: {
                    init: function() {
                        this.update();
                        triggerResizeEvent();
                    },
                    touchEnd: function() {
                        var activeIndex = this.activeIndex;
                        this.slideTo(activeIndex);
                    }
                }
            });

            // Обработчик клика по мини-слайду
            $(element).find('.swiper-slide').on('click', function() {
                var mainSwiper = $(element).closest('.product-modal').find('.product-modal-big__swiper').data('swiper-instance');
                var clickedIndex = $(this).index();

                if (mainSwiper) {
                    mainSwiper.slideTo(clickedIndex); // Синхронизация основного слайдера с мини-слайдером
                }
            });

            $(element).data('swiper-instance', swiperInstance);
        });
    }

	function initializeOptionsSwipers() {
		$('.product-modal-recommendations').each(function(index, element) {
			var swiperInstance = new Swiper(element, {
				slidesPerView: "auto",
				spaceBetween: 8,
				on: {
					init: function() {
						this.update();
					}
				}
			});
	
			$(element).data('swiper-instance', swiperInstance);
		});
	}
	

    initializeThumbSwipers();
    initializeMainSwipers();
	initializeOptionsSwipers();

    $('.recommendations-card').on('click', '.product--js', function(event) {
        event.preventDefault();
        var modalId = $(this).attr('href');

        $.fancybox.open({
            loop: false,
            src: modalId,
            buttons: false,
            baseClass: 'dark-fancybox',
            touch: false,
            autoFocus: false,
            afterShow: function(instance, current) {
                initializeThumbSwipers();
                initializeMainSwipers();
				initializeOptionsSwipers();
            },
            afterClose: function(instance, current) {
                $('.product-modal-big__swiper').each(function(index, element) {
                    var swiperInstance = $(element).data('swiper-instance');
                    if (swiperInstance && typeof swiperInstance.destroy === 'function') {
                        swiperInstance.destroy(true, true);
                        $(element).removeData('swiper-instance');
                    }
                });

                $('.product-modal-small__swiper').each(function(index, element) {
                    var swiperInstance = $(element).data('swiper-instance');
                    if (swiperInstance && typeof swiperInstance.destroy === 'function') {
                        swiperInstance.destroy(true, true);
                        $(element).removeData('swiper-instance');
                    }
                });

				$('.product-modal-recommendations').each(function(index, element) {
					var swiperInstance = $(element).data('swiper-instance');
					if (swiperInstance && typeof swiperInstance.destroy === 'function') {
						swiperInstance.destroy(true, true);
						$(element).removeData('swiper-instance');
					}
				});
            }
        });
    });

	$('body').on('click', '.modal--js', function(event) {
        event.preventDefault();
        var modalNAmeId = $(this).attr('href');
        $.fancybox.open({
            loop: false,
            src: modalNAmeId,
            buttons: false,
            baseClass: 'dark-fancybox',
            touch: false,
            autoFocus: false,
        });
    });
});
