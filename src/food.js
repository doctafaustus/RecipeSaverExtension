function food() {

	// Eligible recipe page
	var eligiblePage = /food.com\/recipe\/\w+/.test(window.location.href);

	if (!eligiblePage) {
		return;
	}

	// Create recipe object
	var recipe = {
		title: getAttributeValue('meta[property="og:title"]', 'content').replace(' - Food.com', ''),
		url: window.location.href,
	  readyIn: getText('.total-time div'),
	  cals: getText('.calories'),
	  servings: getTextMatch('.servings', /\d+/),
	};

	// Description
	var description = '';
	document.querySelectorAll('[data-module="recipeDirections"] li').forEach(function(paragraph) {
		if (paragraph.innerText.trim() !== '' && paragraph.innerText.trim() !== 'Submit a Correction') {
			description += paragraph.innerText + '<br><br>';
		}
	});
	recipe.description = description;

	// Ingredients
	var ingredients = [];
	document.querySelectorAll('li[data-ingredient]').forEach(function(ing) {
		if (ing.innerText.trim() !== 'Add all ingredients to list') {
			ingredients.push(ing.innerText);
		}
	});
	recipe.ingredients = ingredients;


	return recipe;
}
