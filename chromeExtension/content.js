// This script runs in the visited page that's open in Chrome
console.log('I\'m a content script!');


// Receive message from extension
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

	if (request.rsAction === 'save') {
		// Grab the name of the host and execute function of the same name
		var host = window.location.host.replace(/^www\./, '').replace(/\.\w+/, '').toLowerCase();
		var recipe;

		if (typeof this[host] === 'function') {
			console.log('executing: ' + host);
			recipe = this[host]();
			recipe.capturedLocation = host;
		} else {
			recipe = {
				title: $('title').text().trim().replace(/\s([|\-—:>•·~\[,]+|(by|from|recipe)?)\s.*/, ''),
				url: window.location.href,
			};
		}

		sendResponse({rsFinish: recipe });
	}

});




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