$(document).ready(function() {
	// Focus
	if ($(".form__field").length > 0) {
		$('.form__label').on('mousedown touchstart', function(e) {
			e.stopPropagation();
		});
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

	if($(".form-select").length > 0) {
		$('.form-select').on("click", function(event) {
			if(!$(this).hasClass('disabled')){
				$('.form-select').not(this).removeClass('active').find('.form-select-options').slideUp(50);
				$('.form-select').not(this).parent().removeClass('active');
				$(this).toggleClass('active');
				$(this).parent().toggleClass('active');
				$(this).find('.form-select-options').slideToggle(50);
			}
		});
		$('.form-select-options__value').on("click", function() {
			$('.form-select-options__value').removeClass("active");
			setTimeout(function() {
				$(this).parents(".form-select").parent().removeClass("active");
			}, 100);
			$(this).parents(".form-select").find('.form-select-title__caption').addClass("active");
			$(this).parents('.form-select').find('.form-select-title__value').html($(this).html());
			$(this).addClass("active");
			if($.trim($(this).data('value'))!=''){
				$(this).parents('.form-select').find('input').val($(this).data('value'));
			}else{
				$(this).parents('.form-select').find('input').val($(this).html());
			}
		});
		$(document).on("click", function(e) {
			if (!$(e.target).is(".form-select *")) {
				$('.form-select, .form__label').removeClass('active');
				$('.form-select-options').slideUp(50);
			};
		});
		$(".form-select-title__value").each(function () {
			let formSelectValue = $(this).html();
			if (formSelectValue.length > 0) {
				$(this).parent().find('.form-select-title__caption').addClass("active");
			}
		});
	}

	if($(".form-select").length > 0) {
		new AirDatepicker('.date-of-birth');
	}

	if($(".card").length > 0) {
		var cardSwiper = new Swiper(".card-swiper", {
			cssMode: true,
			navigation: {
				nextEl: ".card-swiper .card-swiper-next",
				prevEl: ".card-swiper .card-swiper-prev",
			},
			pagination: {
				el: ".card-swiper .card-swiper-pagination",
				type: "fraction",
				clickable: true,
			},
			mousewheel: true,
			keyboard: true,
		});
	}

	$(".card-code--copy").on("click", function () {
		var cardText = $(this).find("span").text();
		var cardInput = $('<textarea>').val(cardText).appendTo('body').select();
		document.execCommand('copy');
		cardInput.remove();
		$(".vendor-code").addClass("active");
		setTimeout(() => {
			$(".vendor-code").removeClass("active");
		}, 3000);
	});

	let cardCounts = {};
	$('[data-card]').each(function() {
		let cardValue = $(this).data('card');
		if(cardCounts[cardValue]) {
			cardCounts[cardValue]++;
		} else {
			cardCounts[cardValue] = 1;
		}

	});
	var totalCards = $('[data-card]').length;
	$('[data-sort]').each(function() {
        var sortValue = $(this).data('sort');
        if (sortValue === 'all') {
            $(this).find('span').text(totalCards);
        } else {
            var count = cardCounts[sortValue] || 0;
            $(this).find('span').text(count);
        }
    });
	$('[data-sort]').on('click', function() {
        var sortValue = $(this).data('sort');
		$('[data-sort]').removeClass("active");
		$('[data-sort="' + sortValue +'"]').addClass("active");
        if (sortValue === 'all') {
            $('[data-card]').removeClass('hidden');
        } else {
            $('[data-card]').each(function() {
                var cardValue = $(this).data('card');
                if (cardValue !== sortValue) {
                    $(this).addClass('hidden');
                } else {
                    $(this).removeClass('hidden');
                }
            });
        }
    });

	$('.rating-item__stars input[type="radio"]').on('change', function() {
        var selectedRating = $(this).val();
        var $ratingValue = $(this).closest('.review-modal__card').find('.review-modal__rating-value');
        $ratingValue.text(selectedRating + '.0');
    });

	function uploadFilesModalReviews() {
		var inputs = document.querySelectorAll('.inputfile');

		// Устанавливаем лимиты
		var maxLimits = {
			images: 10,  // Лимит изображений
			videos: 3    // Лимит видео
		};

		// Универсальная функция для загрузки файлов (изображений или видео)
		function handleFileUpload(input, type, maxFiles, validateFile) {
			
			var $uploadBox = $(input).closest('.upload').find('.upload__box');
			var $uploadContainer = $(input).closest('.upload').find('.upload__images');

			input.addEventListener('change', function (e) {

				// Считаем, сколько файлов уже добавлено
				var currentCount = $uploadContainer.find('.upload__img').length;
				var remainingSlots = maxFiles - currentCount;

				// Если превышен лимит, выводим предупреждение
				if (this.files.length > remainingSlots) {
					alert(`Вы можете загрузить не более ${maxFiles} ${type === 'images' ? 'изображений' : 'видео'}.`);
					input.value = ''; // Сбрасываем input
					return;
				}

				// Фильтрация файлов для проверки
				var validFiles = Array.prototype.filter.call(this.files, validateFile);

				// Если не все файлы валидные, выводим предупреждение
				if (validFiles.length !== this.files.length) {
					alert(`Можно загружать только ${type === 'images' ? 'файлы формата JPEG или PNG' : 'файлы формата MP4'}.`);
					input.value = ''; // Сбрасываем input
					return;
				}

				// Если есть выбранные файлы, скрываем .upload__box
				if (validFiles.length > 0) {
					$uploadBox.hide(); // Скрываем блок upload__box

					// Проходимся по валидным файлам и отображаем их
					validFiles.forEach(function (file) {
						var reader = new FileReader();

						reader.onload = function (e) {
							if (type === 'videos') {
								var videoElement = document.createElement('video');
								videoElement.src = e.target.result;

								videoElement.onloadedmetadata = function () {
									var duration = videoElement.duration / 60; // Длительность в минутах

									if (duration > 5) {
										alert('Длительность видео не должна превышать 5 минут.');
										return;
									}

									var videoHtml = `
										<div class="upload__img">
											<video src="${e.target.result}" controls></video>
											<button type="button" class="remove-file-btn">
												<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M1.66675 1.66663L8.33341 8.33329" stroke="#352A58" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
													<path d="M8.33341 1.66663L1.66675 8.33329" stroke="#352A58" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
												</svg>
											</button>
										</div>
									`;
									addFileToContainer(videoHtml, $uploadContainer);
								};
							} else {
								var imgHtml = `
									<div class="upload__img">
										<img src="${e.target.result}" alt="Загруженное изображение">
										<button type="button" class="remove-file-btn">
											<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M1.66675 1.66663L8.33341 8.33329" stroke="#352A58" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
												<path d="M8.33341 1.66663L1.66675 8.33329" stroke="#352A58" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
											</svg>
										</button>
									</div>
								`;
								addFileToContainer(imgHtml, $uploadContainer);
							}
						};

						reader.readAsDataURL(file); // Читаем файл как DataURL
					});
				}
			});

			input.addEventListener('focus', function () {
				input.classList.add('has-focus');
			});
			input.addEventListener('blur', function () {
				input.classList.remove('has-focus');
			});
		}

		// Добавляем файл в контейнер
		function addFileToContainer(html, container) {
			var $element = $(html);
			container.append($element);

			$element.find('.remove-file-btn').on('click', function () {
				$(this).closest('.upload__img').remove();

				if (container.find('.upload__img').length === 0) {
					container.closest('.upload').find('.upload__box').show();
				}
			});
		}

		Array.prototype.forEach.call(inputs, function (input) {
			if ($(input).closest('.upload').hasClass('upload-images')) {
				handleFileUpload(input, 'images', maxLimits.images, function (file) {
					return file.type === "image/jpeg" || file.type === "image/png";
				});
			}

			if ($(input).closest('.upload').hasClass('upload-videos')) {
				handleFileUpload(input, 'videos', maxLimits.videos, function (file) {
					return file.type === "video/mp4";
				});
			}
		});
	}
	uploadFilesModalReviews();
	

});