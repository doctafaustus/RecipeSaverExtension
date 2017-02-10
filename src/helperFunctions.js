// Wrapper for document.querySelector
function getText(el) {
  var selection = document.querySelector(el);
  if (selection && selection.innerText) {
  	return selection.innerText;
  } else {
  	return 'NOT FOUND';
  }
}

// Attr using document.querySelector 
function getAttributeValue(el, attr) {
	var selection = document.querySelector(el);
	if (selection && selection.getAttribute(attr)) {
		return selection.getAttribute(attr);
	} else {
		return 'NOT FOUND';
	}
}

// Wrapper for using .match with document.querySelector
function getTextMatch(el, regex, pos) {
	pos = pos || 0;
	var match = getText(el).match(regex)
	if (match) {
		return match[pos]
	} else {
		return 'NO MATCH';
	}
}


var host = window.location.host.replace(/^www\./, '').replace(/\.\w+/, '');
if (typeof this[host] === 'function') {
	this[host]();
}
