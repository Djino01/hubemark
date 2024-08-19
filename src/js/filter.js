$('.all-filters').on("click", function(event) {
	event.preventDefault();
	$("body").addClass("body-bg");
	$(".filter").addClass("active");
});

$('.filter__closed').on("click", function(event) {
	event.preventDefault();
	$("body").removeClass("body-bg");
	$(".filter").removeClass("active");
});


$(function ($) {
	$(document).mouseup(function (e) {
	var div = $(".filter.active");
	if (!div.is(e.target) && div.has(e.target).length === 0) {
			div.removeClass("active");
			$("body").removeClass("body-bg");
		}
	});
});