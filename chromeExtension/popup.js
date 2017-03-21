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

    if (response.rsFinish.ingredients && response.rsFinish.ingredients.length) {
    	var ingredientsVal = response.rsFinish.ingredients.join('\n');

    	ingredientsVal = ingredientsVal.replace(/½/gi, '1/2');
    	ingredientsVal = ingredientsVal.replace(/¼/gi, '1/4');
    	ingredientsVal = ingredientsVal.replace(/¾/gi, '3/4');
    	ingredientsVal = ingredientsVal.replace(/⅛/gi, '1/8');
    	ingredientsVal = ingredientsVal.replace(/⅜/gi, '3/8');
    	ingredientsVal = ingredientsVal.replace(/⅝/gi, '5/8');
    	ingredientsVal = ingredientsVal.replace(/⅞/gi, '7/8');
    	ingredientsVal = ingredientsVal.replace(/⅔/gi, '2/3');
    	ingredientsVal = ingredientsVal.replace(/⅕/gi, '1/5');
    	ingredientsVal = ingredientsVal.replace(/⅖/gi, '2/5');
    	ingredientsVal = ingredientsVal.replace(/⅗/gi, '3/5');
    	ingredientsVal = ingredientsVal.replace(/⅘/gi, '4/5');
    	ingredientsVal = ingredientsVal.replace(/⅙/gi, '1/6');
    	ingredientsVal = ingredientsVal.replace(/⅚/gi, '5/6');

      $('#ingredients').val(ingredientsVal);
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
	  		$('#success').show().html('Oops! Something went wrong. Please login and try again.');
			}
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
