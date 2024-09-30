$(document).ready(function() {

	// Focus
	if ($(".form__field").length > 0) {
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

	// // Like
	// $(".like--js").on("click", function () {
	// 	$(this).toggleClass("active");
	// });

	const receivingSearchWrap = $('.receiving-search');
	const receivingSearchField = $('.receiving-search__field');
	const receivingSearchResult = $('.receiving-search__result');
	const receivingSearchClear = $('.receiving-search-clear');
	const receivingSearchList = $('.receiving-search__list');
	const receivingSearchItems = $('.receiving-search__item');
	const receivingName = $('.receiving-name--js');
	if (receivingSearchField.length > 0) {
		receivingSearchField.on('input', function () {
			const searchValue = $(this).val().trim().toLowerCase(); // Получаем введённое значение и приводим к нижнему регистру
			let hasResults = false;
	
			if (searchValue !== "") {
				receivingSearchClear.addClass('active');
	
				// Фильтрация элементов списка
				receivingSearchItems.each(function () {
					const itemText = $(this).text().trim().toLowerCase(); // Получаем текст элемента и приводим к нижнему регистру
	
					// Сравниваем текст элемента со значением поля ввода
					if (itemText.includes(searchValue)) {
						$(this).show(); // Показываем элемент, если совпадает
						hasResults = true;
					} else {
						$(this).hide(); // Скрываем элемент, если не совпадает
					}
				});
				if (hasResults) {
					receivingSearchResult.addClass('active');
				} else {
					receivingSearchResult.removeClass('active');
				}
			} else {
				// Если поле поиска пустое, убираем классы и показываем все элементы списка
				receivingSearchResult.removeClass('active');
				receivingSearchClear.removeClass('active');
				receivingSearchItems.show(); // Показываем все элементы списка
			}
		});
	
		// Добавляем обработчик для кнопки очистки поля
		receivingSearchClear.on('click', function () {
			receivingSearchField.val(''); // Очищаем поле ввода
			receivingSearchResult.removeClass('active');
			receivingSearchClear.removeClass('active');
			receivingSearchItems.show(); // Показываем все элементы списка
		});
	}
	receivingSearchClear.on("click", function(e){
		e.preventDefault();
		receivingSearchField.val('');
		receivingSearchResult.removeClass('active');
		receivingSearchClear.removeClass('active');
	});

	receivingName.on("click", function (e) {
		e.preventDefault();
		let receivingNameValue = $(this).text().replace(/\s+/g, ' ').trim();
		let receivingId = $(this).data('receiving');
		$(".receiving-fixed").removeClass("active");
		$(`#${receivingId}`).addClass("active");
		setTimeout(function() {
			receivingSearchField.val(receivingNameValue);
		}, 100);
		receivingSearchResult.removeClass('active');
		receivingSearchClear.removeClass('active');
	});
	
	$('.receiving-fixed-closed').on("click", function () {
		$(".receiving-fixed").removeClass("active");
	});

	$('.receiving-fixed-pick-up--js').on("click", function(event) {
		event.preventDefault();
		let pointid = $(this).data('point');
		$("body").addClass("lock");
		$(`#${pointid}`).addClass("active z-index");
	});
	$('.pick-up-point__closed, .select-pick-up-point--js').on("click", function(event) {
		event.preventDefault();
		$("body").removeClass("lock");
		$(".pick-up-point").removeClass("active z-index");
	});

	$('.select-pick-up-point--js').on("click", function(event) {
		event.preventDefault();
		let selectPickUpFieldValue = $('.receiving-search__field').val();
		if (selectPickUpFieldValue) {
			$('.receiving-info__field').val(selectPickUpFieldValue);
		}
		let selectInfoId = $(this).data('info');
		$(".receiving-map").removeClass("active");
		$(".receiving-fixed").removeClass("active");
		$(".receiving-search").addClass("hidden");
		$(`#${selectInfoId}`).addClass("active");
	});

	$(function ($) {
		if($(".pick-up-point").length > 0) {
			$(document).mouseup(function (e) {
				var div = $(".pick-up-point__body");
				if (!div.is(e.target) && div.has(e.target).length === 0) {
					$("body").removeClass("lock");
					$(".pick-up-point").removeClass("active");
					if ($(".pick-up-point").hasClass("active")) {
						$(".pick-up-point").addClass("z-index");
					} else {
						$(".pick-up-point").removeClass("z-index");
					}
				}
			});
		}
	});

	$(".receiving-info-btn--js").on("click", function(){
		$(".receiving-search").removeClass("hidden");
		$(".receiving-info").removeClass("active");
		$(".receiving-map").addClass("active");
		$('.receiving-info__field').val('');
	});

	if($(".time-delivery").length > 0) {
		var timeSwiper = new Swiper(".time-delivery-swiper", {
			slidesPerView: "auto",
			watchSlidesProgress: true,
			spaceBetween: 8,
			navigation: {
				nextEl: ".time-delivery .time-delivery-arrow_next",
				prevEl: ".time-delivery .time-delivery-arrow_prev",
			},
		});

		$('.time-delivery-swiper .swiper-slide').on('click', function() {
			const clickedIndex = $(this).index();
			const currentIndex = timeSwiper.activeIndex;

			// Слайд кликнули, но он не активен, тогда делаем его активным
			if (clickedIndex !== currentIndex) {
				timeSwiper.slideTo(clickedIndex);
			}

			// Убираем класс активного слайда у всех и добавляем к текущему
			timeSwiper.slides.removeClass('swiper-slide-active');
			$(this).addClass('swiper-slide-active');

			// Найти input внутри активного слайда и установить ему checked
			const input = $(this).find('input[type="radio"]');
			if (input.length) {
				input.prop('checked', true); // Устанавливаем checked
			}
		});
	}

});