/* --- Set dev or prod --- */
var mysite = 'http://localhost:3000/recipe-update';
//var mysite = 'https://recipesavertest.herokuapp.com/';

console.log('working!');


$('#more').click(function() {
	$(this).hide();
	$('#extra-data').slideDown();
});

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {rsAction: 'save'}, function(response) {

  	console.info(response.rsFinish);
  	$('#name').val(response.rsFinish.title);

  	$('#url').val(response.rsFinish.url);

  	if (response.rsFinish.ingredients && response.rsFinish.ingredients.length) {
			$('#ingredients').html(response.rsFinish.ingredients.join('<br>'));
  	}
  	
  	$('#description').html(response.rsFinish.description);

  	$('#serves').val(response.rsFinish.servings);

  	$('#ready-in').val(response.rsFinish.readyIn);

  	$('#cals').val(response.rsFinish.cals);

  	// If recipe was captured via an integration then show capture message
  	if (response.rsFinish.capturedLocation) {
  		$('#captured-message').show();
  		$('#loc').text(response.rsFinish.capturedLocation);
  		$('body').attr('style', 'border-top: solid 5px #23d82f;');
  		$('#more').hide();
  		$('#extra-data').slideDown();
  	}
  });
});


// Send recipe to Recipe Saver
$('#recipe-form').submit(function(e) {
	e.preventDefault();
	$.ajax({
		type: 'POST',
	  url: 'http://localhost:3000/extension',
	  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	  data: {'test': 1},
	  success: function(data) {
	  	console.log('Sent to Recipe Saver!');
	  }
	});
});
