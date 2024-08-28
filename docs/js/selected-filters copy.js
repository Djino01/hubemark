// Custom Select
$('.select').click(function(event) {
	if(!$(this).hasClass('disabled')){
		$('.select').not(this).removeClass('active').find('.select-options').slideUp(50);
		$(this).toggleClass('active');
		$(this).find('.select-options').slideToggle(50);
	}
});
$('.select-options__value').click(function() {
	$('.select-options__value').removeClass("active");
	$(this).parents('.select').find('.select-title__value').html($(this).html());
	$(this).addClass("active");
	if($.trim($(this).data('value'))!=''){
		$(this).parents('.select').find('input').val($(this).data('value'));
	}else{
		$(this).parents('.select').find('input').val($(this).html());
	}
});
$(document).click(function(e) {
	if (!$(e.target).is(".select *")) {
		$('.select').removeClass('active');
		$('.select-options').slideUp(50);
	};
});
