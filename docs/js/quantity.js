/*function parseWeight(weightText) {
    if (weightText.includes('кг')) {
        return parseFloat(weightText.replace(/\s+|кг/g, '').replace(',', '.'));
    } else if (weightText.includes('г')) {
        return parseFloat(weightText.replace(/\s+|г/g, '')) / 1000;
    }
    return 0;
}

function updateTotals() {
    let totalOldPrice = 0;
    let totalPrice = 0;
    let totalQuantity = 0;
    let totalDiscount = 0;
    let totalWeight = 0;

    $('.basket-card__right').each(function() {
        const $card = $(this);
        const quantity = parseInt($card.find('.quantity-value input').val());

        const oldPrice = parseFloat($card.find('.basket-card__price-old').text().replace(/\s+|₽/g, ''));
        const price = parseFloat($card.find('.basket-card__price').data('original-price'));
        const weight = parseWeight($card.find('.basket-card__price').data('weight'));

        totalOldPrice += quantity * oldPrice;
        totalPrice += quantity * price;
        totalQuantity += quantity;
        totalWeight += quantity * weight;

        // Обновляем цену в basket-card__price на основе количества
        $card.find('.basket-card__price').text((quantity * price).toLocaleString('ru-RU') + ' ₽');

        // Рассчитываем и суммируем скидку для каждой карточки
        totalDiscount += (oldPrice - price) * quantity;
    });

    $('.total-amount').text(totalOldPrice.toLocaleString('ru-RU') + ' ₽');
    $('.total-value span').text(totalPrice.toLocaleString('ru-RU') + ' ₽');
    $('.quantity-of-goods span').text(totalQuantity);
    $('.your-discount span').text(totalDiscount.toLocaleString('ru-RU') + ' ₽');
    $('.final-weight').text(totalWeight.toFixed(2).replace('.', ',') + ' кг');
}

function updateQuantity(element, increment) {
    const $input = element.find('.quantity-value input');
    let quantity = parseInt($input.val()) + increment;
    quantity = Math.max(quantity, 1); // Не позволяем количеству быть меньше 1

    $input.val(quantity);
    element.find('.btn-minus').toggleClass('disabled', quantity === 1);

    updateTotals();
}

$(document).ready(function() {
    // Сохраняем оригинальные цены
    $('.basket-card__price').each(function() {
        const $price = $(this);
        $price.data('original-price', $price.text().replace(/\s+|₽/g, ''));
    });

    updateTotals();

    $('.quantity-btn').off('click').on('click', function(event) {
        const $btn = $(this);
        updateQuantity($btn.parent(), $btn.hasClass('btn-minus') ? -1 : 1);
        return false;
    });

    // Обработчик для удаления карточки
    $('.delete--js').off('click').on('click', function(event) {
        event.preventDefault();
        $(this).closest('.basket-card').remove(); // Удаляем карточку
        updateTotals(); // Обновляем суммы после удаления карточки
    });
});*/