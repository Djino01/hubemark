$(document).ready(function() {

    // Функция для инициализации основного слайдера
    function initializeMainSwipers() {
        $('.product-modal-big__swiper').each(function(index, element) {
            var swiperInstance = new Swiper(element, {
                slidesPerView: 1,
                spaceBetween: 4,
                effect: "fade",
                navigation: {
                    nextEl: $(element).closest('.product-modal').find('.product-modal-arrow_next')[0],
                    prevEl: $(element).closest('.product-modal').find('.product-modal-arrow_prev')[0],
                },
                thumbs: {
                    swiper: $(element).closest('.product-modal').find('.product-modal-small__swiper').data('swiper-instance'),
                },
            });

            $(element).data('swiper-instance', swiperInstance);
        });
    }

    // Функция для инициализации мини-слайдеров
    function initializeThumbSwipers() {
        $('.product-modal-small__swiper').each(function(index, element) {
            var swiperInstance = new Swiper(element, {
                slidesPerView: 6,
                spaceBetween: 4,
                slideToClickedSlide: true,
                breakpoints: {
                    220: {
                        slidesPerView: 3,
                        spaceBetween: 4,
                    },
                    350: {
                        slidesPerView: 4,
                        spaceBetween: 4,
                    },
                    460: {
                        slidesPerView: 5,
                        spaceBetween: 4,
                    },
                    520: {
                        slidesPerView: 6,
                        spaceBetween: 4,
                    },
                    680: {
                        slidesPerView: 4,
                        spaceBetween: 4,
                    },
                    760: {
                        slidesPerView: 5,
                        spaceBetween: 4,
                    },
                    1010: {
                        slidesPerView: 6,
                        spaceBetween: 4,
                    },
                },
            });

            $(element).data('swiper-instance', swiperInstance);
        });
    }

    // Инициализация всех Swiper-ов при загрузке страницы
    initializeThumbSwipers();
    initializeMainSwipers();

    // Обработка клика по карточке рекомендаций
    $('.recommendations-card').on('click', '.product--js', function (event) {
        event.preventDefault();
        var modalId = $(this).attr('href'); // Получаем значение href

        $.fancybox.open({
            loop: false,
            src: modalId,
            buttons: false,
            baseClass: 'dark-fancybox',
            touch: false,
            autoFocus: false,
            afterShow: function(instance, current) {
                // Инициализация Swiper для мини-слайдера и большого слайдера внутри модального окна
                initializeThumbSwipers();
                initializeMainSwipers();
            },
            afterClose: function(instance, current) {
                // Уничтожение Swiper после закрытия модального окна
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
            }
        });
    });
});
