$(document).ready(function() {
   
	function updateFavoritesCount() {
		let count = $(".favorites .favorites-card").length;
		$(".favorites-value").text(count);
	}

	updateFavoritesCount();

	$(".favorites").on("click", ".like--js", function(){
		$(this).closest('.favorites-card').remove();
		updateFavoritesCount();
		console.log(1)
	});
});