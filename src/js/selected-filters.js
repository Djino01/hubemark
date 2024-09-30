$(document).ready(function() {
    const $filterForm = $('.filter-top, .filter'); // Объединяем оба фильтра
    const $selectedFiltersContainer = $('.selected-filters');
    const $resetAllButton = $('.reset-all-filters'); // Получаем кнопку из HTML

    // Восстанавливаем фильтры из куки при загрузке страницы
    loadFiltersFromCookie();

    // Отслеживаем изменения в обоих фильтрах
    $filterForm.on('change', 'input[type="radio"], input[type="checkbox"]', function() {
        const $input = $(this);
        updateSelectedFilters($input);
        synchronizeFilters($input); // Синхронизируем состояние фильтров
        toggleResetAllButton();
        saveFiltersToCookie();
    });

    $resetAllButton.on('click', function() {
        resetAllFilters();
        saveFiltersToCookie();
    });

    $('.filter--clear').on('click', function(e) {
        e.preventDefault();
        resetAllFilters();
        saveFiltersToCookie();
    });

    // Функция обновления выбранных фильтров
    function updateSelectedFilters($input) {
        const $label = $input.closest('label');
        const filterText = $label.find('.checbox__caption, .item-checbox__caption').first().text().trim();

        if ($input.attr('type') === 'radio') {
            const existingFilter = $selectedFiltersContainer.find(`[data-filter="${$input.attr('name')}"]`);
            if (existingFilter.length) {
                existingFilter.find('span').text(filterText);
            } else {
                const $filterElement = createFilterElement($input.attr('name'), filterText);
                $filterElement.insertBefore($resetAllButton);
            }
        } else if ($input.attr('type') === 'checkbox') {
            const filterKey = `${$input.attr('name')}-${$input.val()}`;
            const existingFilter = $selectedFiltersContainer.find(`[data-filter="${filterKey}"]`);

            if ($input.is(':checked') && existingFilter.length === 0) {
                const $filterElement = createFilterElement(filterKey, filterText);
                $filterElement.insertBefore($resetAllButton);
            } else if (!$input.is(':checked')) {
                existingFilter.remove();
            }
        }

        toggleResetAllButton();
    }

    // Синхронизируем фильтры в обоих блоках (filter-top и filter)
    function synchronizeFilters($input) {
        const name = $input.attr('name');
        const value = $input.val();
        const type = $input.attr('type');
        
        // Ищем соответствующие элементы в других блоках фильтра и синхронизируем их состояние
        $filterForm.find(`input[name="${name}"][value="${value}"]`).each(function() {
            if ($(this).is($input)) return; // Пропускаем сам элемент
            $(this).prop('checked', $input.prop('checked'));
        });
    }

    // Создание элемента выбранного фильтра
    function createFilterElement(filterKey, filterText) {
        const $filterElement = $('<div>', {
            class: 'selected-filter',
            'data-filter': filterKey,
            html: `<span>${filterText}</span><button><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 7L17 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M17 7L7 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg></button>`
        });

        $filterElement.find('button').on('click', function() {
            $filterElement.remove();
            const filterParts = filterKey.split('-');
            const name = filterParts[0];
            const value = filterParts[1];
            const $input = $filterForm.find(`input[name="${name}"][value="${value}"]`);
            $input.prop('checked', false);

            saveFiltersToCookie();
            synchronizeFilters($input); // Синхронизируем фильтры при удалении
            toggleResetAllButton();
        });

        return $filterElement;
    }

    // Показываем или скрываем кнопку сброса фильтров
    function toggleResetAllButton() {
        if ($selectedFiltersContainer.find('.selected-filter').length > 0) {
            $resetAllButton.css('display', 'inline-flex');
        } else {
            $resetAllButton.css('display', 'none');
        }
    }

    function resetAllFilters() {
        console.log("Resetting all filters");
        $selectedFiltersContainer.find('.selected-filter').remove();
        $filterForm.find('input[type="radio"], input[type="checkbox"]').prop('checked', false);
        toggleResetAllButton();
        saveFiltersToCookie();
    }

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
            setCookie('selectedFilters', '', -1);
        }
    }

    function loadFiltersFromCookie() {
        let selectedFilters = getCookie('selectedFilters');
        console.log("Loaded from cookie: ", selectedFilters);

        if (selectedFilters) {
            let filtersArray = decodeURIComponent(selectedFilters).split('&');
            filtersArray.forEach(function(filter) {
                let [name, values] = filter.split('=');
                if (name && values) {
                    let valueArray = values.split(',');
                    valueArray.forEach(function(value) {
                        let $input = $filterForm.find(`input[name="${name}"][value="${value}"]`);
                        if ($input.length) {
                            console.log(`Applying filter: name=${name}, value=${value}`);
                            $input.prop('checked', true);
                            updateSelectedFilters($input);
                        }
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
