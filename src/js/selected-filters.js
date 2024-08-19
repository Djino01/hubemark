$(document).ready(function() {
    const $filterForm = $('.filter-top, .filter'); // Объединяем оба фильтра
    const $selectedFiltersContainer = $('.selected-filters');

    // Создаем кнопку "Сбросить всё"
    const $resetAllButton = $('<button>', {
        class: 'reset-all-filters',
        text: 'Сбросить всё',
        css: { display: 'none' }
    });

    $selectedFiltersContainer.append($resetAllButton);

    $filterForm.on('change', 'input[type="radio"], input[type="checkbox"]', function() {
        updateSelectedFilters($(this));
        toggleResetAllButton();
    });

    $resetAllButton.on('click', function() {
        resetAllFilters();
    });

    function updateSelectedFilters($input) {
        const $label = $input.closest('label');
        const filterText = $label.find('.checbox__caption, .item-checbox__caption').text(); // Учитываем разные классы

        if ($input.attr('type') === 'radio') {
            // Для радио-кнопок удаляем предыдущий выбор и добавляем новый
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
                    $input.prop('checked', false); // Снимаем выбор с радио
                    toggleResetAllButton();
                });
            }
        } else if ($input.attr('type') === 'checkbox') {
            // Для чекбоксов добавляем новый элемент или удаляем, если он уже существует
            if ($input.is(':checked')) {
                const $filterElement = $('<div>', {
                    class: 'selected-filter',
                    'data-filter': $input.attr('name') + '-' + $input.val(), // Уникальный ключ для каждого чекбокса
                    html: `<span>${filterText}</span><button><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7 7L17 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M17 7L7 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg></button>`
                });

                $filterElement.insertBefore($resetAllButton);

                $filterElement.find('button').on('click', function() {
                    $filterElement.remove();
                    $input.prop('checked', false); // Снимаем выбор с чекбокса
                    toggleResetAllButton();
                });
            } else {
                $selectedFiltersContainer.find(`[data-filter="${$input.attr('name')}-${$input.val()}"]`).remove();
                toggleResetAllButton();
            }
        }
    }

    function toggleResetAllButton() {
        // Если есть выбранные фильтры, показываем кнопку, иначе скрываем
        if ($selectedFiltersContainer.find('.selected-filter').length > 0) {
            $resetAllButton.show();
        } else {
            $resetAllButton.hide();
        }
    }

    function resetAllFilters() {
        // Удаляем все выбранные фильтры и сбрасываем выбор в форме
        $selectedFiltersContainer.find('.selected-filter').remove();
        $filterForm.find('input[type="radio"], input[type="checkbox"]').prop('checked', false);
        toggleResetAllButton();
    }
});
