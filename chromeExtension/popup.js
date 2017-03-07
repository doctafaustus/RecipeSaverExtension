/* --- Set dev or prod --- */
var mysite = 'http://localhost:3000/recipe-update';
//var mysite = 'https://recipesavertest.herokuapp.com/';

// Show extra field on click of "More Details"
$('#more').click(function() {
	$(this).hide();
	$('#extra-data').slideDown();
});


// Retrieve user's RS id from chrome storage
var rs_id;
chrome.storage.sync.get('rs_id', function(storage) {
  rs_id = storage.rs_id;
  console.log(rs_id);
});


// When popup.us opens, send message to content script to extract recipe data
// On response, populate the extension form with the returned data
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {rsAction: 'extract'}, function(response) {

    console.info(response);
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
