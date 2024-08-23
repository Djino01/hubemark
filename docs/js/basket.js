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

});