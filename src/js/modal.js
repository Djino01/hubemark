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
			},
			afterClose: function () {
				clearInterval(countdownInterval); // Очищаем таймер при закрытии модалки
				$('.countdown').text("01:00"); // Сбрасываем текст таймера
			}
		});
	});

	// Повторная отправка кода
	$('body').on('click', '.form__info-code', function(event) {
		event.preventDefault();
		$('.form__info-code').removeClass('active');
		$('.form__info-desc').removeClass('hidden');

		var phoneNumber = $('.phone-mask').val(); // Получаем номер телефона для повторной отправки

		// Останавливаем текущий таймер
		clearInterval(countdownInterval);
		var countdownElement = $('.countdown');
		startCountdown(59, countdownElement);

		// Повторная отправка кода
		$.ajax({
			url: '/auth/endpoint.php',
			method: 'POST',
			data: {
				action: 'send_code', // Повторно вызываем отправку кода
				phone: phoneNumber
			},
			success: function(response) {
				if (response.role) {

					if (response.role == 'CLIENT' || response.role == 'NOT_FOUND') {
						$('#code-phone').data('status', response.role); // Устанавливаем атрибут data-status
					}
				} else {
					alert('Ошибка повторной отправки кода: ' + response);
				}
			},
			error: function() {
				alert('Ошибка при повторной отправке запроса.');
			}
		});
	});

	// Первая отправка кода при вводе телефона
	$('body').on('click', '.btn_code', function(event) {
		event.preventDefault();
		var phoneNumber = $('.phone-mask').val(); // Получаем номер телефона

		$.ajax({
			url: '/auth/endpoint.php',
			method: 'POST',
			data: {
				action: 'send_code', // Первичная отправка кода
				phone: phoneNumber
			},
			success: function(response) {

				if (response.role) {
					if (response.role == 'CLIENT' || response.role == 'NOT_FOUND') {
						$('#code-phone').data('status', response.role); // Устанавливаем атрибут data-status
						$.fancybox.close();
						$.fancybox.open({
							src: '#code-phone',
							buttons: false,
							baseClass: 'dark-fancybox',
						});

						var countdownElement = $('.countdown');
						startCountdown(59, countdownElement); // Запуск таймера
					}
				} else {
					alert('Ошибка отправки кода: ' + response.message);
				}
			},
			error: function() {
				alert('Ошибка при отправке запроса.');
			}
		});
	});


	$('body').on('submit', '.modal-new__form', function(event) {
		event.preventDefault();
		var code = $('.code-mask').val();
		var phone = $('.phone-mask').val();
		var status = $('#code-phone').data('status'); // Получаем статус пользователя из предыдущего шага


		$.ajax({
			url: '/auth/endpoint.php',
			method: 'POST',
			data: { action: 'end_to_end_authorization', phone: phone, code: code, status: status },
			success: function(response) {
				if (response.success) {
					alert('Авторизация успешна!');

					$.fancybox.close(); // Закрываем модальное окно только после успешной авторизации
					window.location.href = '/';
				} else {
					alert('Ошибка авторизации: ' + response.message);
				}
			},
			error: function() {
				alert('Ошибка при авторизации.');
			}
		});
	});

	$.fn.setCursorPosition = function() {
		this.each(function() {
			var value = $(this).val();
			var firstEmptyPos = value.indexOf('_');

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

	// Функция для запуска валидации номера телефона
	function initPhoneMaskValidation() {
		var $phoneInput = $('.phone-mask');
		var $btnCode = $('.modal--js.btn_code');
		var $modalSubtitle = $('.modal-new__subtitle-value span');

		// Функция для проверки правильности введённого номера
		function validatePhoneNumber(phone) {
			var cleanedPhone = phone.replace(/\D/g, ''); // Убираем все символы, кроме цифр
			return cleanedPhone.length === 11; // Проверяем, что в номере ровно 11 цифр
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
			var phoneNumber = $phoneInput.val();
			$modalSubtitle.text(phoneNumber);
		});
	}

	// Функция debounce для задержки выполнения
	function debounce(func, delay) {
		let timer;
		return function() {
			clearTimeout(timer);
			timer = setTimeout(() => func.apply(this, arguments), delay);
		};
	}

	// Функция, которая разрешает ввод только цифр в поле .code-mask и ограничивает ввод до 4 символов
	function allowOnlyNumbers(input) {
		// Обработчик нажатия клавиш
		$(input).on('keydown', function(e) {
			var currentValue = $(this).val(); // Текущее значение поля

			// Разрешаем только цифры, Backspace, Delete, стрелки, Tab и комбинацию Ctrl/Cmd + V
			if ((e.key >= '0' && e.key <= '9') || e.key === 'Backspace' || e.key === 'Delete' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Tab' || (e.ctrlKey || e.metaKey && e.key === 'v')) {
				// Проверяем, не превышает ли текущее количество символов 4, если это цифра
				if (e.key >= '0' && e.key <= '9' && currentValue.length >= 4) {
					e.preventDefault(); // Если 4 символа уже введено, блокируем дальнейший ввод цифр
				}
				return true; // Разрешаем эти клавиши
			} else {
				e.preventDefault(); // Блокируем остальные клавиши
				return false;
			}
		});

		// Обработчик вставки через Ctrl+V
		$(input).on('paste', function(e) {
			var pastedData = e.originalEvent.clipboardData.getData('text'); // Получаем вставленный текст
			var cleanedData = pastedData.replace(/\D/g, ''); // Убираем все нецифровые символы
			var currentValue = $(this).val(); // Текущее значение поля

			// Ограничиваем вставку до 4 символов
			if (cleanedData.length + currentValue.length > 4) {
				cleanedData = cleanedData.slice(0, 4 - currentValue.length); // Обрезаем, если вставляется больше 4 символов
			}

			// Вставляем очищенные данные
			e.preventDefault();
			document.execCommand('insertText', false, cleanedData);
		});
	}

	// Валидация кода
	function initCodeMaskValidation() {
		// Блокировка нажатия Enter
		$('.code-mask').on('keydown', function(e) {
			if (e.key === 'Enter') {
				e.preventDefault();
				return false; // Полностью блокируем действие клавиши Enter
			}
		});

		// Логика ввода и отправки кода
		$('.code-mask').on('keyup input', debounce(function () {
			var codeValue = $(this).val().replace(/_/g, ''); // Убираем символы маски, если остались

			// Проверяем, заполнено ли поле полностью (4 цифры)
			if (codeValue.length === 4 && /^\d{4}$/.test(codeValue)) {
				$('.loader').addClass('active');

				var phone = $('.phone-mask').val();
				var status = $('#code-phone').data('status');

				$.ajax({
					url: '/auth/endpoint.php',
					method: 'POST',
					data: { action: 'end_to_end_authorization', phone: phone, code: codeValue, status: status },
					success: function(response) {
						console.log(response);
						if (response.success) {
							alert('Авторизация успешна!');
							$.fancybox.close();
							location.href='/';
						} else {
							alert('Неправильный код: ' + response.success);
							$('.loader').removeClass('active');
						}
					},
					error: function() {
						alert('Ошибка при авторизации!');
						$('.loader').removeClass('active');
					}
				});
			} else {
				$('.loader').removeClass('active');
			}
		}, 300)); // 300 ms задержка между запросами
	}

	// Инициализация функции для ввода только цифр и разрешения вставки, и ограничения до 4 символов
	allowOnlyNumbers('.code-mask');
	// Инициализация валидации телефона и кода
	initCodeMaskValidation();
	initPhoneMaskValidation();
});
