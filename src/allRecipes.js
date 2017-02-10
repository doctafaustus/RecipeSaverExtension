// // Eligible recipe page
// var eligiblePage = /allrecipes.com\/recipe\/\d+/.test(window.location.href);

// // Create recipe object
// var recipe = {
// 	title: document.querySelector('.recipe-summary__h1').innerText.trim(),
// 	url: window.location.href,
//   readyIn: document.querySelector('.ready-in-time').innerText,
//   cals: '',
//   servings: document.querySelector('#servings-button .servings-count span').innerText,
// };


// // Calories
// var calorieText = document.querySelector('.calorie-count').innerText;
// if (/\d+/.test(calorieText)) {
// 	recipe.cals = document.querySelector('.calorie-count').innerText.match(/\d+/);
// }

// // Description
// var description = '';
// document.querySelectorAll('.recipe-directions__list--item').forEach(function(paragraph) {
// 	if (paragraph.innerText.trim() !== '') {
// 		description += paragraph.innerText + '<br><br>';
// 	}
// });
// recipe.description = description;

// // Ingredients
// var ingredients = [];
// document.querySelectorAll('.recipe-ingred_txt').forEach(function(ing) {
// 	if (ing.innerText.trim() !== 'Add all ingredients to list') {
// 		ingredients.push(ing.innerText);
// 	}
// });
// recipe.ingredients = ingredients;

// console.log(recipe);



