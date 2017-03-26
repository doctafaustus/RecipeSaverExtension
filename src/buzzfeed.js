function buzzfeed() {

	// Eligible recipe page
	// NOTE: There doesn't seem to be a great way to target recipe pages (URLs are not specific enough and there were inconsistencies using meta tags)
	var eligiblePage = Boolean(jQuery('h2.subbuzz_name:contains("INGREDIENTS")').length && jQuery('h2.subbuzz_name:contains("PREPARATION")').length);

	if (!eligiblePage) {
		console.log('Page not eligible for recipe parsing');
		return;
	}


	// Create recipe object
	var recipe = {
		title: jQuery('h2.subbuzz_name .buzz_superlist_number_inline:contains("1.")').parent().text().replace(/1\.\s/, ''),
		url: window.location.href,
	};

	// If on a recipe made "4 ways" then return (there's too many sections to parse as one recipe)
	if (recipe.title.toLowerCase().indexOf('4 ways') > -1) {
		return;
	}


	// Description
	recipe.description = '';
	var $normalDesc = jQuery('h2.subbuzz_name:contains("PREPARATION")').parent().find('p');
	var $listDesc = jQuery('h2.subbuzz_name:contains("PREPARATION")').parent().find('ol');


	if ($normalDesc.length) {
		var pLength = $normalDesc.length;
		var spacer = '<br><br>';
		$normalDesc.each(function(index) {
			if (index + 1 === pLength) {
				spacer = '';
			}
			recipe.description +=  jQuery(this).html() + spacer;
		});
	}
	else if ($listDesc.length) {
		var lLength = $listDesc.find('li').length;
		var spacer = '<br><br>';
		$listDesc.find('li').each(function(index){
			if (index + 1 === lLength) {
				spacer = '';
			}
			if (jQuery(this).text().trim() !== '') {
				recipe.description += jQuery(this).text().trim() + spacer;
			}
		});
	}


	// Ingredients
	recipe.ingredients = jQuery('h2.subbuzz_name:contains("INGREDIENTS")').parent().find('p:not(".sub_buzz_desc:contains(Serv)")').text().split('\n');

	return recipe;
}