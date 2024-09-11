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
});