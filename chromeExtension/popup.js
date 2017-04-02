/* --- Set dev or prod --- */
//var mysite = 'http://localhost:3000/extension';
var mysite = 'https://recipesaver.herokuapp.com/extension';
// ^ Use this URL even in live production (for some reason, using http://www.recipesaver.net won't work)

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

    var ingredientsVal = '';
    if (response.rsFinish.ingredients && response.rsFinish.ingredients.length) {
      ingredientsVal = '<b>Ingredients:</b><br><ul>';
      response.rsFinish.ingredients.forEach(function(ing) {
        ingredientsVal += '<li>' + ing + '</li>';
      });
      ingredientsVal += '</ul><br>';
    }
    
    var descriptionVal = '';
    if (response.rsFinish.description) {
      descriptionVal = response.rsFinish.description;
    }

    $('#description').html(ingredientsVal + descriptionVal);


    // If recipe was captured via an integration then show capture message
    if (response.rsFinish.capturedLocation) {
      $('#captured-message').show();

      // If captured location was Buzzfeed then change it to Tasty
      if (response.rsFinish.capturedLocation === 'buzzfeed') {
      	response.rsFinish.capturedLocation = 'tasty';
      }

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
		description: $('#description').html(),
		url: $('#url').val(),
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

	// Validate for name
	if ($('#name').val().length < 1) {
		$('#success').show().html('Recipe must include a name');
		return;
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
	  error: function(jqXHR) {
	  	$('#initial-view').hide();
			if (jqXHR.status === 413) {
	  		$('#success').show().html('Recipe is too large');
			} else if (jqXHR.status === 403) {
				$('#success').show().html('You\'ve reached your maximum storage limit.<br>Please <a href="https://www.recipesaver.net/plans" target="_blank">upgrade</a> your account to store more recipes.');
			} else {
	  		$('#success').show().html('Oops! Something went wrong. Please <a target="_blank" href="https://www.recipesaver.net/">login</a> and try again.');
			}
	  }
	});
});