$(".product-params__coll-value--copy").on("click", function () {
	var text = $(this).find("span").text();
	var input = $('<textarea>').val(text).appendTo('body').select();
    document.execCommand('copy');
    input.remove();
	$(".vendor-code").addClass("active");
	setTimeout(() => {
		$(".vendor-code").removeClass("active");
	}, 3000);
});
