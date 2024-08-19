$(document).ready(function() {
    var swiper;
    var modalSwiper2;

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
                // Инициализация Swiper для мини-слайдера
                swiper = new Swiper(".product-modal-small__swiper", {
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

                // Инициализация Swiper для большого слайдера
                modalSwiper2 = new Swiper(".product-modal-big__swiper", {
                    slidesPerView: 1,
                    spaceBetween: 4,
                    effect: "fade",
                    navigation: {
                        nextEl: ".product-modal .product-modal-arrow_next",
                        prevEl: ".product-modal .product-modal-arrow_prev",
                    },
                    thumbs: {
                        swiper: swiper,
                    },
                });
            },
            afterClose: function(instance, current) {
                // Уничтожение Swiper после закрытия модального окна
                if (swiper) {
                    swiper.destroy(true, true);
                }
                if (modalSwiper2) {
                    modalSwiper2.destroy(true, true);
                }
            }
        });
    });
});
