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

	// Переменная для хранения интервала
	let countdownInterval;
	// Функция для запуска таймера
	function startCountdown(duration, display) {
		let timer = duration, minutes, seconds;
		countdownInterval = setInterval(function () {
			minutes = Math.floor(timer / 60);
			seconds = timer % 60;
			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;
			display.text(minutes + ":" + seconds);
			if (--timer < 0) {
			clearInterval(countdownInterval); // Останавливаем таймер, когда он дойдёт до нуля
			$('.form__info-desc').addClass('hidden');
			$('.form__info-code').addClass('active');
			}
		}, 1000);
	}

	$('body').on('click', '.modal--js', function(event) {
        event.preventDefault();
        let modalNAmeId = $(this).data('modal-window');
		$.fancybox.close();
        $.fancybox.open({
            loop: false,
            src: modalNAmeId,
            buttons: false,
            baseClass: 'dark-fancybox',
            touch: false,
            autoFocus: false,
			afterShow: function (instance, current) {
				// Проверяем, есть ли в модалке таймер с классом .countdown
				var countdownElement = $(current.src).find('.countdown');
				if (countdownElement.length > 0) {
					clearInterval(countdownInterval); // Очищаем предыдущий таймер, если он был
					startCountdown(59, countdownElement); // Запускаем новый таймер на 59 секунд
				}
				if ($(modalNAmeId).hasClass('review-modal')) {
					$(modalNAmeId).find('video').each(function() {
						$(this).removeAttr('autoplay');
						this.pause();
						this.currentTime = 0;
						this.load();
						this.muted = true;
						this.playbackRate = 0;
					});
				}
			},
			afterClose: function () {
			  clearInterval(countdownInterval); // Очищаем таймер при закрытии модалки
			  $('.countdown').text("01:00"); // Сбрасываем текст таймера
			}
        });
    });

	$('body').on('click', '.form__info-code', function () {
		$('.form__info-code').removeClass('active');
		$('.form__info-desc').removeClass('hidden');
		
		// Останавливаем текущий таймер
		clearInterval(countdownInterval);
		var countdownElement = $('.countdown');
		startCountdown(59, countdownElement);
	});

	$.fn.setCursorPosition = function() {
		this.each(function() {
			var value = $(this).val(); // Получаем текущее значение поля
			var firstEmptyPos = value.indexOf('_'); // Находим первое пустое место, обозначенное '_'
	
			// Если найдено пустое место, установим курсор туда
			if (firstEmptyPos !== -1) {
				if (this.setSelectionRange) {
					this.setSelectionRange(firstEmptyPos, firstEmptyPos);
				} else if (this.createTextRange) {
					var range = this.createTextRange();
					range.collapse(true);
					range.moveEnd('character', firstEmptyPos);
					range.moveStart('character', firstEmptyPos);
					range.select();
				}
			}
		});
		return this;
	};

	$(".phone-mask").on("click", function(){
		$(this).setCursorPosition(3);
	}).mask("+7(999) 999-9999");

	$(".code-mask").on("click", function(){
		$(this).setCursorPosition(0);
	}).mask("9999");

	function initPhoneMaskValidation() {
		var $phoneInput = $('.phone-mask');
		var $btnCode = $('.modal--js.btn_code');
		var $modalSubtitle = $('.modal-new__subtitle-value span');
		// Функция для проверки правильности введённого номера
		function validatePhoneNumber(phone) {
			// Убираем все символы, кроме цифр
			var cleanedPhone = phone.replace(/\D/g, '');
			// Проверяем, что в номере ровно 11 цифр (1 для +7 и 10 для основного номера)
			return cleanedPhone.length === 11;
		}

		// Обработчик ввода в поле .phone-mask
		$('.phone-mask').on('keyup input', function () {
			var phoneNumber = $(this).val(); // Получаем значение поля

			// Если номер введён корректно, убираем атрибут disabled
			if (validatePhoneNumber(phoneNumber)) {
				$btnCode.removeAttr('disabled');
			} else {
				$btnCode.attr('disabled', 'disabled'); // Если номер некорректен, блокируем кнопку
			}
		});

		// Обработка клика на кнопку .btn_code
		$btnCode.on('click', function () {
			var phoneNumber = $phoneInput.val(); // Получаем значение из поля phone-mask
			$modalSubtitle.text(phoneNumber); // Вставляем значение в span
		});
	}
	function initCodeMaskValidation() {
		$('.code-mask').on('keyup input', function () {
			var codeValue = $(this).val().replace(/_/g, ''); // Убираем символы маски (подчеркивания)
	
			// Проверяем, заполнено ли поле полностью (4 цифры)
			if (codeValue.length === 4 && /^\d{4}$/.test(codeValue)) {
				// Добавляем класс active к лоадеру
				$('.loader').addClass('active');
	
				// Через 1 секунду закрываем текущее модальное окно и открываем новое
				setTimeout(function () {
					$.fancybox.close();
				}, 1000);
			} else {
				// Убираем класс, если условие не выполнено
				$('.loader').removeClass('active');
			}
		});
	}
	initPhoneMaskValidation();
	initCodeMaskValidation();

});
