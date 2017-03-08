function foodnetwork() {
	// Eligible recipe page
	var eligiblePage = /foodnetwork.com\/recipes\/(?!packages)/.test(window.location.href);

	if (!eligiblePage) {
		return false;
	}

	// Create recipe object
	var recipe = {
		title: $('meta[property="og:title"]').attr('content'),
		url: window.location.href,
	};

	// Description
	var description = '';
	$('.o-Method__m-Body p, .m-Directions__a-Headline').each(function() {
		if ($(this).text().trim() !== '' && $(this).text().trim() !== 'Watch how to make this recipe.') {
			description += $(this).text().trim() + '<br><br>';
		}
	});
	recipe.description = description;

	// Ingredients
	var ingredients = [];
	$('.o-Ingredients__a-ListItem').each(function() {
		ingredients.push($(this).text().trim());
	});
	recipe.ingredients = ingredients;

	return recipe;
}