function allrecipes() {

	// Eligible recipe page
	var eligiblePage = /allrecipes.com\/recipe\/\d+/.test(window.location.href);

	if (!eligiblePage) {
		return;
	}

	// Create recipe object
	var recipe = {
		title: $('.recipe-summary__h1').text().trim(),
		url: window.location.href,
	};

	// Description
	var description = '';
	$('.recipe-directions__list--item').each(function() {
		if ($(this).text().trim() !== '') {
			description += $(this).text().trim() + '<br><br>';
		}
	});
	recipe.description = description;


	// Ingredients
	var ingredients = [];
	$('.recipe-ingred_txt').each(function() {
		if ($(this).text().trim() !== 'Add all ingredients to list') {
			ingredients.push($(this).text().trim());
		}
	});
	recipe.ingredients = ingredients;


	return recipe;
}
