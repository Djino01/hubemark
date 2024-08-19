// Custom Select
$('.filter-select').on("click", function(event) {
	if($(event.target).closest('.filter-select__hidden').length === 0) {
        $('.filter-select').not(this).removeClass('active').find('.filter-select__hidden').removeClass('active');
        $(this).toggleClass('active');
        $(this).find('.filter-select__hidden').toggleClass('active');
	}
});

$(".filter-select__hidden").on("click", function(event) {
	event.stopPropagation();
});
$(document).on("click", function(e) {
	if (!$(e.target).is(".filter-select *")) {
		$('.filter-select').removeClass('active');
		$('.filter-select__hidden').removeClass('active');
	};
});
