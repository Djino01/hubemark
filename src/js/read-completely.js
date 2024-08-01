$(".read-completely--js").on("click", function (e) {
	e.preventDefault();
	$(this).toggleClass('active');
	if($(this).hasClass("active")) {
		$(this).find("span").text("Свернуть");
	} else {
		$(this).find("span").text("Читать полностью");
	}
	$(this).parent().find(".reviews-card__text").toggleClass('active');
});