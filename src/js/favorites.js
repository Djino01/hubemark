$(document).ready(function() {

	let deleteTimeout;

	function updateFavoritesCount() {
		let count = $(".favorites .favorites-card").length;
		$(".favorites-value").text(count);
	}

	updateFavoritesCount();

	$(".favorites").on("click", ".like--js", function() {
		let $this = $(this);
		let delitCardName = $this.closest('.favorites-card').find(".recommendations-card__desc").text();
		let productId = $this.data('product-id'); // Получаем ID товара

		// Проверка наличия productId
		if (!productId) {
			alert('ID товара не найден');
			return;
		}

		// Отправляем AJAX-запрос на сервер
		$.ajax({
			type: 'POST',
			url: '/local/templates/WG/ajax/favorite_action.php',
			data: { action: 'delete', product_id: productId },
			success: function(response) {
				if (response.success) {
					// Если товар успешно удален на сервере, выполняем удаление карточки из DOM
					$this.closest('.favorites-card').remove();

					// Обновляем количество товаров в избранном
					updateFavoritesCount();

					// Показ уведомления об удалении
					$(".vendor-delete__caption span").text(delitCardName);
					$(".vendor-delete").addClass("active");

					// Автоматическое скрытие уведомления через 3 секунды
					clearTimeout(deleteTimeout);
					deleteTimeout = setTimeout(function() {
						$(".vendor-delete").removeClass("active");
					}, 3000);
				} else {
					alert(response.message); // Сообщение об ошибке
				}
			},
			error: function() {
				alert('Ошибка при отправке запроса на удаление');
			}
		});
	});

	$(document).on('input', '.favorites-search__field', function () {
		let query = $(this).val();

		if (query.length > 2) {
			$.ajax({
				url: '/local/templates/WG/ajax/favorite_action.php',
				type: 'GET',
				data: { action: 'search', q: query },
				success: function (response) {
					$('.favorites-search__list').empty(); // Очищаем список
					if (response.length > 0) {
						response.forEach(function (item) {
							$('.favorites-search__list').append(
								'<li class="favorites-search__item" data-name="' + item.NAME + '">' +
								item.NAME +
								'</li>'
							);
						});
					} else {
						$('.favorites-search__list').append('<li class="favorites-search__item">Нет результатов</li>');
					}
				},
				error: function (xhr, status, error) {
					alert('Ошибка поиска: ' + error);
				}
			});
		}
	});


	$(document).on('click', '.favorites-search__item', function () {
		let name = $(this).data('name');
		$('.favorites-search__field').val(name);
		$('.favorites-search__list').empty();  // Очищаем список после выбора
	});



	$(".vendor-delete-btn").on("click", function(){
		clearTimeout(deleteTimeout);
		$(".vendor-delete").removeClass("active");
	});

	$(".recommendations-card__btn").on("click", function() {
		let $this = $(this);
		let productId = $this.data('product-id');
		if (!productId) {
			alert('ID товара не найден');
			return;
		}
		$.ajax({
			type: 'POST',
			url: '/local/templates/WG/ajax/favorite_action.php',
			data: {   action:'add_to_cart', product_id: productId },
			success: function(response) {
				var data = JSON.parse(response);
				if (data.success) {
					alert('Товар добавлен в корзину');
					// Обновляем интерфейс корзины (например, увеличиваем счетчик)
					updateCartCount();
				} else {
					alert('Ошибка добавления товара: ' + data.message);
				}
			},
			error: function() {
				alert('Ошибка при добавлении товара в корзину');
			}
		});
	});

	const favoriteSearchWrap = $('.favorites-search');
    const favoriteSearchField = $('.favorites-search__field');
    const favoriteSearchResult = $('.favorites-search__result');
    const favoriteSearchClear = $('.favorites-search-clear');
    if (favoriteSearchWrap.length > 0) {
        favoriteSearchField.on('input', function () {
            if ($(this).val().trim() !== "") {
                favoriteSearchResult.addClass('active');
                favoriteSearchClear.addClass('active');
            } else {
                favoriteSearchResult.removeClass('active');
                favoriteSearchClear.removeClass('active');
            }
        });
    }
	favoriteSearchClear.on("click", function(e){
		e.preventDefault();
		favoriteSearchField.val('');
		favoriteSearchResult.removeClass('active');
		favoriteSearchClear.removeClass('active');
	});
});