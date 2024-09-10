$(document).ready(function() {
	//Change quantity
	if ($(".quantity-btn:not(.quantity-btn-basket)").length > 0) {
		$('.quantity-btn:not(.quantity-btn-basket)').click(function(event) {
			var n=parseInt($(this).parent().parent().find('.quantity-value input').val());
			if($(this).hasClass('btn-minus')){
			if(n == 1) {
				$(this).parent().removeClass('active').parent().find(".products__bacret-btn, .mainproducts__backet-btn").removeClass('active');

			} else {
				n=n-1;
				if(n == 1){
				$(this).addClass('disabled');
				}
			}
			}else{
			$(this).parent().find('.btn-minus').removeClass('disabled');
			n=n+1;
			}
			$(this).parent().parent().find('.quantity-value input').val(n);
			return false;
		});
	}
	if ($(".quantity-btn.quantity-btn-basket").length > 0) {
		$('.quantity-btn.quantity-btn-basket').click(function(event) {
			var n=parseInt($(this).parent().parent().find('.quantity-value input').val());
			if($(this).hasClass('btn-minus')){
			if(n == 1) {
				$(this).parents('.basket__product').fadeOut();
			} else {
				n=n-1;
				if(n == 1){
				$(this).addClass('disabled');
				}
			}
			}else{
			$(this).parent().find('.btn-minus').removeClass('disabled');
			n=n+1;
			}
			$(this).parent().parent().find('.quantity-value input').val(n);
			return false;
		});
	}

	// Focus
	if ($(".form__field").length > 0) {
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

	// Like
	$(".like--js").on("click", function () {
		$(this).toggleClass("active");
	});

	const receivingSearchWrap = $('.receiving-search');
    const receivingSearchField = $('.receiving-search__field');
    const receivingSearchResult = $('.receiving-search__result');
    const receivingSearchClear = $('.receiving-search-clear');
    const receivingName = $('.receiving-name--js');
    if (receivingSearchWrap.length > 0) {
        receivingSearchField.on('input', function () {
            if ($(this).val().trim() !== "") {
                receivingSearchResult.addClass('active');
                receivingSearchClear.addClass('active');
            } else {
                receivingSearchResult.removeClass('active');
                receivingSearchClear.removeClass('active');
            }
        });
    }
	receivingSearchClear.on("click", function(e){
		e.preventDefault();
		receivingSearchField.val('');
		receivingSearchResult.removeClass('active');
		receivingSearchClear.removeClass('active');
	});

	receivingName.on("click", function (e) {
		e.preventDefault();
		let receivingNameValue = $(this).text().replace(/\s+/g, ' ').trim();
		$(".receiving-fixed").addClass("active");
		receivingSearchField.val(receivingNameValue);
		receivingSearchResult.removeClass('active');
		receivingSearchClear.removeClass('active');
	});
	$('.receiving-fixed-closed').on("click", function () {
		$(".receiving-fixed").removeClass("active");
	});

	$('.receiving-fixed-pick-up--js').on("click", function(event) {
		event.preventDefault();
		$("body").addClass("lock");
		$(".pick-up-point").addClass("active z-index");
	});
	$('.pick-up-point__closed, .select-pick-up-point--js').on("click", function(event) {
		event.preventDefault();
		$("body").removeClass("lock");
		$(".pick-up-point").removeClass("active z-index");
	});

	$('.select-pick-up-point--js').on("click", function(event) {
		event.preventDefault();
		$(".receiving-map").removeClass("active");
		$(".receiving-fixed").removeClass("active");
		$(".receiving-search").addClass("hidden");
		$(".receiving-info").addClass("active");
	});
	
	$(function ($) {
		if($(".pick-up-point").length > 0) {
			$(document).mouseup(function (e) {
			var div = $(".pick-up-point__body");
			if (!div.is(e.target) && div.has(e.target).length === 0) {
				$("body").removeClass("lock");
				$(".pick-up-point").removeClass("active");
				if ($(".pick-up-point").hasClass("active")) {
					$(".pick-up-point").addClass("z-index");
				} else {
					$(".pick-up-point").removeClass("z-index");
				}
				}
			});
		}
	});

	$(".receiving-info-btn--js").on("click", function(){
		$(".receiving-search").removeClass("hidden");
		$(".receiving-info").removeClass("active");
		$(".receiving-map").addClass("active");
	});
	
	if($(".time-delivery").length > 0) {
		var timeSwiper = new Swiper(".time-delivery-swiper", {
			slidesPerView: "auto",
			watchSlidesProgress: true,
			spaceBetween: 8,
			navigation: {
				nextEl: ".time-delivery .time-delivery-arrow_next",
				prevEl: ".time-delivery .time-delivery-arrow_prev",
			},
		});
	
		$('.time-delivery-swiper .swiper-slide').on('click', function() {
			const clickedIndex = $(this).index();
			const currentIndex = timeSwiper.activeIndex;
			if (clickedIndex !== currentIndex) {
				timeSwiper.slideTo(clickedIndex);
			}
			timeSwiper.slides.removeClass('swiper-slide-active');
			$(this).addClass('swiper-slide-active');
		});
	}

});