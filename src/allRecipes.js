function allrecipes() {

	// Eligible recipe page
	var eligiblePage = /allrecipes.com\/recipe\/\d+/.test(window.location.href);

	if (!eligiblePage) {
		return;
	}

	// Create recipe object
	var recipe = {
		title: getText('.recipe-summary__h1').trim(),
		url: window.location.href,
	  readyIn: getText('.ready-in-time'),
	  cals: '',
	  servings: getText('#servings-button .servings-count span'),
	};


	// Calories
	var calorieText = getText('.calorie-count');
	if (/\d+/.test(calorieText)) {
		recipe.cals = getTextMatch('.calorie-count', /\d+/);
	}

	// Description
	var description = '';
	document.querySelectorAll('.recipe-directions__list--item').forEach(function(paragraph) {
		if (paragraph.innerText.trim() !== '') {
			description += paragraph.innerText + '<br><br>';
		}
	});
	recipe.description = description;

	// Ingredients
	var ingredients = [];
	document.querySelectorAll('.recipe-ingred_txt').forEach(function(ing) {
		if (ing.innerText.trim() !== 'Add all ingredients to list') {
			ingredients.push(ing.innerText);
		}
	});
	recipe.ingredients = ingredients;


	return recipe;
}
