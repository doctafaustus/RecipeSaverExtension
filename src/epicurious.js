function epicurious() {
	// Eligible recipe page
	var eligiblePage = /epicurious.com\/recipes\/food\/views\//.test(window.location.href);

	if (!eligiblePage) {
		return false;
	}

	// Create recipe object
	var recipe = {
		title: getAttributeValue('meta[property="og:title"]', 'content'),
		url: window.location.href,
	  readyIn: '',
	  cals: getText('.nutri-data[itemprop="calories"]'),
	};

	recipe.servings = getTextMatch('.yield[itemprop="recipeYield"]', /\d+/);


	// Description
	var description = '';
	document.querySelectorAll('.preparation-step').forEach(function(paragraph) {
		if (paragraph.innerText.trim() !== '') {
			description += paragraph.innerText + '<br><br>';
		}
	});
	recipe.description = description;

	// Ingredients
	var ingredients = [];
	document.querySelectorAll('.ingredients-info .ingredient').forEach(function(ing) {
		ingredients.push(ing.innerText);
	});
	recipe.ingredients = ingredients;

	return recipe;
}