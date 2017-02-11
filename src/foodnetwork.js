function foodnetwork() {
	// Eligible recipe page
	var eligiblePage = /foodnetwork.com\/recipes\/(?!packages)/.test(window.location.href);

	if (!eligiblePage) {
		return false;
	}

	// Create recipe object
	var recipe = {
		title: getAttributeValue('meta[property="og:title"]', 'content'),
		url: window.location.href,
	  readyIn: getText('.o-RecipeInfo__a-Description--Total'),
	  cals: '',
	  servings: getTextMatch('.o-RecipeInfo.o-Yield .o-RecipeInfo__a-Description', /\d+/),
	};

	// Description
	var description = '';
	document.querySelectorAll('.o-Method__m-Body p, .m-Directions__a-Headline').forEach(function(paragraph) {
		if (paragraph.innerText.trim() !== '' && paragraph.innerText.trim() !== 'Watch how to make this recipe.') {
			description += paragraph.innerText + '<br><br>';
		}
	});
	recipe.description = description;

	// Ingredients
	var ingredients = [];
	document.querySelectorAll('.o-Ingredients__a-ListItem').forEach(function(ing) {
		ingredients.push(ing.innerText);
	});
	recipe.ingredients = ingredients;

	return recipe;
}