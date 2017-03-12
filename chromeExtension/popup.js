/* --- Set dev or prod --- */
var mysite = 'http://localhost:3000/extension';
//var mysite = 'https://recipesavertest.herokuapp.com/extension';

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
      $('#ingredients').val(response.rsFinish.ingredients.join('\n'));
      autosize();
    }
    
    $('#description').html(response.rsFinish.description);

    // $('#serves').val(response.rsFinish.servings);
    // $('#ready-in').val(response.rsFinish.readyIn);
    // $('#cals').val(response.rsFinish.cals);

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

	var data = {
		rs_id: rs_id,
		recipeName: $('#name').val(),
		ingredients: $('#ingredients').val().split('\n'),
		description: $('#description').html(),
		url: $('#url').val(),
		// servings: $('#serves').val(),
		// readyIn: $('#ready-in').val(),
		// cals: $('#cals').val(),
	};
	// Tags
	if ($('#tags').val().length) {
		data.tags = [];
		var tags = $('#tags').val().split(',');
		tags.forEach(function(tag) {
			var newTag = {
				name: tag.trim(),
				color: '#808080',
			};
			data.tags.push(newTag);
		});
	}

	$.ajax({
		type: 'POST',
	  url: mysite,
	  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	  data: data,
	  success: function(data) {
	  	console.log('Sent to Recipe Saver!');
	  	$('#initial-view').hide();
	  	$('#success').show();
	  },
	  error: function() {
	  	$('#initial-view').hide();
	  	$('#success').show().html('Oops! Something went wrong. Please login and try again.');
	  }
	});
});


// Auto size textarea on keydown
var textarea = document.getElementById('ingredients');
textarea.addEventListener('keydown', autosize);
function autosize() {
  setTimeout(function(){
    textarea.style.cssText = 'height: auto; padding :0;';
    textarea.style.cssText = 'height:' + (textarea.scrollHeight + 15) + 'px;';
  },0);
}
