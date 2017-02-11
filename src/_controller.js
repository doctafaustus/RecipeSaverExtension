// Wrapper for document.querySelector
function getText(el) {
  var selection = document.querySelector(el);
  if (selection && selection.innerText) {
  	return selection.innerText.trim();
  } else {
  	return false;
  }
}

// Attr using document.querySelector 
function getAttributeValue(el, attr) {
	var selection = document.querySelector(el);
	if (selection && selection.getAttribute(attr)) {
		return selection.getAttribute(attr).trim();
	} else {
		return false;
	}
}

// Wrapper for using .match with document.querySelector
function getTextMatch(el, regex, pos) {
	pos = pos || 0;
	if (getText(el).length) {
		var match = getText(el).match(regex)
		if (match) {
			return match[pos]
		} else {
			return false;
		}
	} else {
		return false;
	}
}


// Grab the name of the host and execute function of the same name
var host = window.location.host.replace(/^www\./, '').replace(/\.\w+/, '').toLowerCase();
if (typeof this[host] === 'function') {
	this[host]();
}
