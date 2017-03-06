function epicurious() {
	// Eligible recipe page
	var eligiblePage = /epicurious.com\/recipes\/food\/views\//.test(window.location.href);

	if (!eligiblePage) {
		return false;
	}

	// Create recipe object
	var recipe = {
		title: $('meta[property="og:title"]').attr('content'),
		url: window.location.href,
	  readyIn: '',
	  cals: $('.nutri-data[itemprop="calories"]').text().trim(),
	};

	recipe.servings = getTextMatch('.yield[itemprop="recipeYield"]', /\d+/);


	// Description
	var description = '';
	$('.preparation-step').each(function(){
		if ($(this).text().trim() !== '') {
			description += $(this).text().trim() + '<br><br>';
		}
	});
	recipe.description = description;

	// Ingredients
	var ingredients = [];
	$('.ingredients-info .ingredient').each(function() {
		ingredients.push($(this).text().trim());
	});
	recipe.ingredients = ingredients;

	return recipe;
}