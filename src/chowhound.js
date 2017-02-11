// console.log is overwritten on this site
function chowhound() {

	// Eligible recipe page
	var eligiblePage = getAttributeValue('meta[property="bt:type"]', 'content');

	if (!eligiblePage) {
		return;
	}

	// Create recipe object
	var recipe = {
		title: getAttributeValue('meta[property="og:title"]', 'content').replace(' Recipe', ''),
		url: window.location.href,
	  readyIn: getText('time'),
	  cals: '',
	  servings: getTextMatch('.frr_serves', /\d+/),
	};

	// Description
	var description = '';
	document.querySelectorAll('.frr_wrap[itemprop="recipeInstructions"] ol > li').forEach(function(paragraph) {
		if (paragraph.innerText.trim() !== '') {
			description += paragraph.innerText.replace(/^\d([A-Z])/, '$1') + '<br><br>';
		}
	});
	recipe.description = description;

	// Ingredients
	var ingredients = [];
	document.querySelectorAll('li[itemprop="ingredients"]').forEach(function(ing) {
		if (ing.innerText.trim() !== '') {
			ingredients.push(ing.innerText);
		}
	});
	recipe.ingredients = ingredients;


	return recipe;
}

