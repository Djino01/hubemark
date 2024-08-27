$(document).ready(function () {
    var progressBar = $('.promo-progress span');
    var slideDuration = 5000; // Время отображения одного слайда в миллисекундах
    var progressTimeout; // Переменная для хранения идентификатора таймера

    var swiper = new Swiper('.promo-swiper', {
        loop: true,
        pagination: {
            el: '.main-pagination',
            clickable: true,
        },
        on: {
            slideChangeTransitionStart: function () {
                resetProgressBar();
            }
        }
    });

    function startProgressBar() {
        progressBar.css({
            'transition': 'width ' + slideDuration + 'ms linear',
            'width': '100%'
        });

        // Сохраняем идентификатор таймера в переменную
        progressTimeout = setTimeout(function () {
            swiper.slideNext(); // Переключение на следующий слайд после завершения анимации
        }, slideDuration);
    }

    function resetProgressBar() {
        // Очищаем предыдущий таймер, чтобы избежать конфликта при ручном переключении
        clearTimeout(progressTimeout);

        progressBar.css({
            'transition': 'none',
            'width': '0%'
        });

        // Запуск анимации прогресс-бара с небольшой задержкой
        setTimeout(startProgressBar, 50);
    }

    // Инициализация прогресс-бара при загрузке страницы
    resetProgressBar();
});
