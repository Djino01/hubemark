$(document).ready(function() {
    const $newAddressCheckbox = $('input[name="new-address"]');
    const $fieldsContainer = $('.new-address__container');
    const $newAddressOver = $('.new-address__over');
    const $rememberAddressCheckbox = $('input[name="remember-the-address"]');
    const $addressFields = $fieldsContainer.find('input[name="apartment"], input[name="entrance"], input[name="floor"], input[name="intercom"]');
    const $deliveryWrap = $('.courier__delivery-wrap');
	const $radioInputs = $('input[type="radio"][name="address"]');

    // Изначально деактивируем поля
    toggleFields(false);

    // Следим за изменением чекбокса "Другой адрес"
    $newAddressCheckbox.on('change', function() {
        toggleFields($(this).is(':checked'));
		if ($(this).is(':checked')) {
            $radioInputs.prop('checked', false);
        }
    });

    // Обработчик для чекбокса "Запомнить адрес"
    $rememberAddressCheckbox.on('change', function() {
        if ($(this).is(':checked') && areFieldsFilled()) {
            const addressString = generateAddressString();
            addNewAddressOption(addressString);
        }
    });

    // Функция деактивации/активации полей
    function toggleFields(isEnabled) {
		$newAddressOver.toggleClass("active");
    }

    // Проверка заполнены ли все поля
    function areFieldsFilled() {
        let allFilled = true;
        $addressFields.each(function() {
            if ($(this).val() === '') {
                allFilled = false;
            }
        });
        return allFilled;
    }

    // Генерация строки адреса
    function generateAddressString() {
        const cityStreetHouse = $('input.new-address-search__field').val();
        const apartment = $('input[name="apartment"]').val();
        const entrance = $('input[name="entrance"]').val();
        const floor = $('input[name="floor"]').val();
        const intercom = $('input[name="intercom"]').val();

        return `${cityStreetHouse}, кв. ${apartment}, подъезд ${entrance}`;
    }

    // Добавление нового блока с адресом
    function addNewAddressOption(addressString) {
        const newLabel = $('<label/>', { class: 'checbox checbox_item' });
        const newRadio = $('<input/>', { type: 'radio', name: 'address', checked: true });
        const newIcon = $('<div/>', { class: 'checbox__icon' });
        const newBox = $('<div/>', { class: 'checbox__box' });
        const newCaption = $('<div/>', { class: 'checbox__caption', text: addressString });

        newBox.append(newCaption);
        newLabel.append(newRadio).append(newIcon).append(newBox);

        $deliveryWrap.append(newLabel);
		$('.new-address input, .new-address textarea').val('');
		$('.new-address .form__caption').removeClass("active");
    }
});
