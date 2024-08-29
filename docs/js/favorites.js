$(document).ready(function() {

	let deleteTimeout;

	function updateFavoritesCount() {
		let count = $(".favorites .favorites-card").length;
		$(".favorites-value").text(count);
	}

	updateFavoritesCount();

	$(".favorites").on("click", ".like--js", function(){
		let delitCardName = $(this).closest('.favorites-card').find(".recommendations-card__desc").text();
		$(this).closest('.favorites-card').remove();
		updateFavoritesCount();
		$(".vendor-delete__caption span").text(delitCardName);
		$(".vendor-delete").addClass("active");
		clearTimeout(deleteTimeout);
		deleteTimeout = setTimeout(function(){
			$(".vendor-delete").removeClass("active");
		}, 3000);
	});

	$(".vendor-delete-btn").on("click", function(){
		clearTimeout(deleteTimeout);
		$(".vendor-delete").removeClass("active");
	});

	const favoriteSearchWrap = $('.favorites-search');
    const favoriteSearchField = $('.favorites-search__field');
    const favoriteSearchResult = $('.favorites-search__result');
    const favoriteSearchClear = $('.favorites-search-clear');
    if (favoriteSearchWrap.length > 0) {
        favoriteSearchField.on('input', function () {
            if ($(this).val().trim() !== "") {
                favoriteSearchResult.addClass('active');
                favoriteSearchClear.addClass('active');
            } else {
                favoriteSearchResult.removeClass('active');
                favoriteSearchClear.removeClass('active');
            }
        });
    }
	favoriteSearchClear.on("click", function(e){
		e.preventDefault();
		favoriteSearchField.val('');
		favoriteSearchResult.removeClass('active');
		favoriteSearchClear.removeClass('active');
	});

	// Custom Select
	$('.select').on("click", function(event) {
		if(!$(this).hasClass('disabled')){
			$('.select').not(this).removeClass('active').find('.select-options').slideUp(50);
			$(this).toggleClass('active');
			$(this).find('.select-options').slideToggle(50);
		}
	});
	$('.select-options__value').on("click", function() {
		$('.select-options__value').removeClass("active");
		$(this).parents('.select').find('.select-title__value').html($(this).html());
		$(this).addClass("active");
		if($.trim($(this).data('value'))!=''){
			$(this).parents('.select').find('input').val($(this).data('value'));
		}else{
			$(this).parents('.select').find('input').val($(this).html());
		}
	});
	$(document).on("click", function(e) {
		if (!$(e.target).is(".select *")) {
			$('.select').removeClass('active');
			$('.select-options').slideUp(50);
		};
	});
});