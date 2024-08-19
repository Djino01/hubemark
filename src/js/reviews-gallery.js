$(document).ready(function() {
    $('[data-fancybox="gallery"]').fancybox({
        loop: false,
        baseClass: 'dark-fancybox',
        touch: false,
        infobar: false,
        buttons : [
            'close'
        ],
        thumbs : {
            autoStart : true,   // Автоматическое отображение миниатюр при открытии
            axis      : 'y'     // Позиция миниатюр - по горизонтали (можно использовать 'y' для вертикального отображения)
        }
    });

	$('[data-fancybox="gallery-1"]').fancybox({
        loop: false,
        baseClass: 'dark-fancybox',
        touch: false,
        infobar: false,
        buttons : [
            'close'
        ],
        thumbs : {
            autoStart : true,   // Автоматическое отображение миниатюр при открытии
            axis      : 'y'     // Позиция миниатюр - по горизонтали (можно использовать 'y' для вертикального отображения)
        }
    });
});
