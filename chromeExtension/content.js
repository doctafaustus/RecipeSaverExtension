// This script runs in the visited page that's open in Chrome

if (window.location.hostname === 'recipesaver.herokuapp.com' || window.location.hostname === 'www.recipesaver.net' || window.location.hostname === '127.0.0.1') {
	
	var rs_id = $('#rs-id').attr('data-rs-id');
	//console.warn(rs_id);
	//
  // Save user id to storage
  chrome.storage.sync.set({'rs_id': rs_id}, function() {
    //console.log('rs_id saved');
  });

}


// Receive message from extension
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

	// Extract recipe
	if (request.rsAction === 'extract') {
		// Grab the name of the host and execute function of the same name
		var host = window.location.host.replace(/^www\./, '').replace(/\.\w+/, '').toLowerCase();
		var recipe;

		if (typeof this[host] === 'function') {
			console.log('executing: ' + host);
			recipe = this[host]();

			if (recipe) {
				recipe.capturedLocation = host;
			} else {
				recipe = defaultParse();
			}

		} else {
			recipe = defaultParse();
		}

		sendResponse({rsFinish: recipe });
	}

});


function defaultParse() {
	return {
		title: $('title').text().trim().replace(/\s([|\-—:>•·~\[,]+|(by|from|recipe)?)\s.*/, ''),
		url: window.location.href,
	};
}




// Wrapper for using .match with a jQuery element's text
function getTextMatch(el, regex, pos) {
	pos = pos || 0;
	if ($(el).text().trim().length) {
		var match = $(el).text().trim().match(regex)
		if (match) {
			return match[pos]
		} else {
			return false;
		}
	} else {
		return false;
	}
}