$(document).ready(function () {
    const searchWrap = $('.search');
    const searchField = $('#search-field');
    const searchResult = $('.search__result');
    const searchClear = $('.search-clear');

    if (searchWrap.length > 0) {
        searchField.on('input', function () {
            if ($(this).val().trim() !== "") {
                searchResult.addClass('active');
                searchClear.addClass('active');
            } else {
                searchResult.removeClass('active');
                searchClear.removeClass('active');
            }
        });
    }

	searchClear.on("click", function(e){
		e.preventDefault();
		searchField.val('');
		searchResult.removeClass('active');
		searchClear.removeClass('active');
	});
});

