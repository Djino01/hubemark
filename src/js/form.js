/*Focus*/
if ($(".form__field").length > 0) {
	$(document).ready(function () {
		// Проверка при загрузке страницы
		$(".form__field").each(function () {
			let value = $(this).val();
			if (value.length > 0) {
				$(this).parent().find('.form__caption').addClass("active");
			}
		});
	
		// Добавляем обработчик события focus
		$('.form__field').on('focus', function () {
			$(this).parent().find('.form__caption').addClass("active");
		});
	
		// Добавляем обработчик события blur
		$('.form__field').on('blur', function () {
			let value = $(this).val();
			if (value.length == 0) {
				$(this).parent().find('.form__caption').removeClass("active");
			} else {
				$(this).parent().find('.form__caption').addClass("active");
			}
		});
	});
	
}

let passwordFields = document.querySelectorAll('.form__password');
passwordFields?.forEach(function(passwordField) {
	passwordField.addEventListener('click', function() {
		let inputField = passwordField.previousElementSibling;
		if (inputField.getAttribute('type') === 'password') {
			inputField.setAttribute('type', 'text');
		} else {
			inputField.setAttribute('type', 'password');
		}
		passwordField.classList.toggle('active');
	});
});