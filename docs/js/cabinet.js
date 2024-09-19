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

});