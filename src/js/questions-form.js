$(document).ready(function() {
	let questionField = $('.questions-form__field--js');

	questionField.on('click', function() {
		$(".questions-form__block").slideDown(100);
	});

	$(".questions-form__btn--cancel").on('click', function(e) {
		e.preventDefault();
		$(".questions-form__block").slideUp(100);
	});

	let maxChars = 1000;
	questionField.on('input', function() {
		let text = $(this).val();
		var charCount = text.length;

		if(charCount > maxChars) {
			$(this).val(text.substring(0, maxChars));
			charCount = maxChars;
			alert("Достигнуто максимальное число символов!");
		}

		$('.questions-form__symbols span').text(charCount);
	});
});