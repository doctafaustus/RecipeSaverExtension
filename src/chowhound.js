// console.log is overwritten on this site
function chowhound() {

	// Eligible recipe page
	// 
	var eligiblePage = $('meta[property="bt:type"]').attr('content');

	if (!eligiblePage) {
		return;
	}

	// Create recipe object
	var recipe = {
		title: $('meta[property="og:title"]').attr('content').replace(' Recipe', ''),
		url: window.location.href,
	  readyIn: $('time').text().trim(),
	  cals: '',
	  servings: getTextMatch('.frr_serves', /\d+/),
	};

	// Description
	var description = '';
	$('.frr_wrap[itemprop="recipeInstructions"] ol > li').each(function() {
		if ($(this).text().trim() !== '') {
			description += $(this).text().trim().replace(/^\d*([A-Z])/, '$1') + '<br><br>';
		}
	});
	recipe.description = description;
	console.log(description)

	// Ingredients
	var ingredients = [];
	$('li[itemprop="ingredients"]').each(function() {
		if ($(this).text().trim() !== '') {
			ingredients.push($(this).text().trim());
		}
	});
	recipe.ingredients = ingredients;

	return recipe;
}