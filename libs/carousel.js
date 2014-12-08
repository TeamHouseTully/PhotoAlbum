(function() {
	$('document').ready(function() {
		var timer = setInterval(nextSlide, 5000);

		$('#carousel-inner').hover(function() {
			clearInterval(timer);
		}, function() {
			timer = setInterval(nextSlide, 5000);
		});

		$('#nextLink').on('click', function(e) {
			nextSlide();
		});

		$('#previousLink').on('click', function(e) {
			var currentActiveImage = $('.shown');
			var nextActiveImage = currentActiveImage.prev();

			if (nextActiveImage.length == 0) {
				nextActiveImage = $('#carousel-inner a').last();
			}

			switcClassAtribute(currentActiveImage, nextActiveImage);
		});

		function nextSlide() {
			var currentActiveImage = $('.shown');
			var nextActiveImage = currentActiveImage.next();

			if (nextActiveImage.length == 0) {
				nextActiveImage = $('#carousel-inner a').first();
			}

			switcClassAtribute(currentActiveImage, nextActiveImage);
		}		

		function switcClassAtribute(current, next) {
			current.removeClass('shown').addClass('hiden').css('z-index', -10);
			next.addClass('shown').removeClass('hiden').css('z-index', 20);

			$('#carousel-inner').not([current, next]).css('z-index', 1);
		}
	});
}());