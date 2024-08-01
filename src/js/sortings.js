$(".sortings__btn--js").on("click", function (e) {
	e.preventDefault();
	$(this).parent().find(".sortings__btn--js").removeClass('active');
	$(this).addClass('active');
});