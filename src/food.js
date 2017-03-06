function food() {

	// Eligible recipe page
	var eligiblePage = /food.com\/recipe\/\w+/.test(window.location.href);

	if (!eligiblePage) {
		return;
	}

	// Create recipe object
	var recipe = {
		title: $('meta[property="og:title"]').attr('content').replace(' - Food.com', ''),
		url: window.location.href,
	  readyIn: $('.recipe-cooktime').text().trim().replace('READY IN:', '').trim(),
	  cals: $('.calories').text().trim(),
	  servings: getTextMatch('#yield-servings .count', /\d+/),
	};

	// Description
	var description = '';
	$('[data-module="recipeDirections"] li').each(function() {
		if ($(this).text().trim() !== '' && $(this).text().trim() !== 'Submit a Correction') {
			description += $(this).text().trim() + '<br><br>';
		}
	});
	recipe.description = description;

	// Ingredients
	var ingredients = [];
	$('li[data-ingredient]').each(function() {
		if ($(this).text().trim() !== 'Add all ingredients to list') {
			ingredients.push($(this).text().trim());
		}
	});
	recipe.ingredients = ingredients;


	return recipe;
}
