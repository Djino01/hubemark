$(".filter-top__btn--list").on("click", function(){
	$(".filter-top__btn").removeClass("active");
	$(this).addClass("active");
	$(this).parents().find(".catalog-page__wrap").removeClass("catalog--list");
	$(this).parents().find(".catalog-page__wrap").find(".recommendations-card").removeClass("card--list");
});
$(".filter-top__btn--grid").on("click", function(){
	$(".filter-top__btn").removeClass("active");
	$(this).addClass("active");
	$(this).parents().find(".catalog-page__wrap").addClass("catalog--list");
	$(this).parents().find(".catalog-page__wrap").find(".recommendations-card").addClass("card--list");
});
