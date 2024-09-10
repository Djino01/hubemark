$(document).ready(function() {
    const $filterForm = $('.filter-top, .filter'); // Объединяем оба фильтра
    const $selectedFiltersContainer = $('.selected-filters');

    // Создаем кнопку "Сбросить всё"
    const $resetAllButton = $('<button>', {
        class: 'reset-all-filters get-filter',
        text: 'Сбросить всё',
        css: { display: 'none' }
    });

    $selectedFiltersContainer.append($resetAllButton);

    // Восстанавливаем фильтры из куки при загрузке страницы
    loadFiltersFromCookie();

    $filterForm.on('change', 'input[type="radio"], input[type="checkbox"]', function() {
        updateSelectedFilters($(this));
        toggleResetAllButton();
        saveFiltersToCookie();
    });

    $resetAllButton.on('click', function() {
        resetAllFilters();
        saveFiltersToCookie();
    });

    // Обработчик клика на filter--clear, вызывающий ту же функцию сброса
    $('.filter--clear').on('click', function(e) {
		e.preventDefault();
        resetAllFilters();
        saveFiltersToCookie();
    });

    function updateSelectedFilters($input) {
        const $label = $input.closest('label');
        const filterText = $label.find('.checbox__caption, .item-checbox__caption').text();

        if ($input.attr('type') === 'radio') {
            const existingFilter = $selectedFiltersContainer.find(`[data-filter="${$input.attr('name')}"]`);
            if (existingFilter.length) {
                existingFilter.find('span').text(filterText);
            } else {
                const $filterElement = $('<div>', {
                    class: 'selected-filter',
                    'data-filter': $input.attr('name'),
                    html: `<span>${filterText}</span><button><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7 7L17 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M17 7L7 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg></button>`
                });

                $filterElement.insertBefore($resetAllButton);

                $filterElement.find('button').on('click', function() {
                    $filterElement.remove();
                    $input.prop('checked', false);
                    toggleResetAllButton();
                    saveFiltersToCookie();
                });
            }
        } else if ($input.attr('type') === 'checkbox') {
            if ($input.is(':checked')) {
                const $filterElement = $('<div>', {
                    class: 'selected-filter',
                    'data-filter': $input.attr('name') + '-' + $input.val(),
                    html: `<span>${filterText}</span><button><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7 7L17 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M17 7L7 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg></button>`
                });

                $filterElement.insertBefore($resetAllButton);

                $filterElement.find('button').on('click', function() {
                    $filterElement.remove();
                    $input.prop('checked', false);
                    toggleResetAllButton();
                    saveFiltersToCookie();
                });
            } else {
                $selectedFiltersContainer.find(`[data-filter="${$input.attr('name')}-${$input.val()}"]`).remove();
                toggleResetAllButton();
                saveFiltersToCookie();
            }
        }
    }

    function toggleResetAllButton() {
        if ($selectedFiltersContainer.find('.selected-filter').length > 0) {
            $resetAllButton.show();
        } else {
            $resetAllButton.hide();
        }
    }

    function resetAllFilters() {
        console.log("Resetting all filters");
        $selectedFiltersContainer.find('.selected-filter').remove();
        $filterForm.find('input[type="radio"], input[type="checkbox"]').prop('checked', false);
        toggleResetAllButton();
        saveFiltersToCookie();
    }

    // Функции работы с куки
	function setCookie(name, value, days = 30) {
		let expires = '';
		if (days) {
			let date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = '; expires=' + date.toUTCString();
		}
		document.cookie = name + '=' + encodeURIComponent(value || '') + expires + '; path=/';
		console.log(`Set cookie: ${name}=${value} with expiry: ${expires}`);
	}

    function getCookie(name) {
		let nameEQ = name + '=';
		let ca = document.cookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i].trim();
			if (c.indexOf(nameEQ) === 0) {
				console.log(`Found cookie: ${c}`);
				return c.substring(nameEQ.length, c.length);
			}
		}
		console.log(`Cookie ${name} not found`);
		return null;
	}

    function saveFiltersToCookie() {
        let selectedFilters = {};
        $filterForm.find('input[type="radio"]:checked, input[type="checkbox"]:checked').each(function() {
            const name = $(this).attr('name');
            const value = $(this).val();

            console.log(`Checking filter: name=${name}, value=${value}`);

            if (value) {
                if (!selectedFilters[name]) {
                    selectedFilters[name] = [];
                }
                selectedFilters[name].push(value);
            }
        });

        let cookieArray = [];
        for (let key in selectedFilters) {
            cookieArray.push(key + '=' + selectedFilters[key].join(','));
        }

        const cookieValue = cookieArray.join('&');

        if (cookieValue) {
            console.log("Saving to cookie: ", cookieValue);
            setCookie('selectedFilters', cookieValue);
        } else {
            console.log("No filters to save.");
            setCookie('selectedFilters', '', -1); // Удаляем куки, если нет фильтров для сохранения
        }
    }

    function loadFiltersFromCookie() {
		let selectedFilters = getCookie('selectedFilters');
		console.log("Loaded from cookie: ", selectedFilters);
	
		if (selectedFilters) {
			let filtersArray = decodeURIComponent(selectedFilters).split('&');
			let appliedFilters = new Set();
	
			filtersArray.forEach(function(filter) {
				let [name, values] = filter.split('=');
				if (name && values) { // Дополнительная проверка наличия значений
					let valueArray = values.split(',');
	
					valueArray.forEach(function(value) {
						let $inputs = $filterForm.find(`input[name="${name}"][value="${value}"]`);
						$inputs.each(function() {
							let $input = $(this);
							let filterText = $input.closest('label').find('.checbox__caption, .item-checbox__caption').text();
	
							console.log(`Applying filter: name=${$input.attr('name')}, value=${value}`);
							$input.prop('checked', true);
	
							if (!appliedFilters.has(value)) {
								updateSelectedFilters($input);
								appliedFilters.add(value);
							}
						});
					});
				} else {
					console.warn(`Invalid filter format in cookie: ${filter}`);
				}
			});
			toggleResetAllButton();
		} else {
			console.warn("No valid filters loaded from cookie");
		}
	}

	
});
