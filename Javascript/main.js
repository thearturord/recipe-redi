let apiKey = "ff7d6e71b4244599a7b3c29ceb43f384";
let apiKeyAlt = "90b4bf234e22493e89325b6f9cce868e";
let apiKeyAlt2 = "410ef8bc76654549b955c1fb5a1ba3ed";

let baseUrl = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + apiKey;
let recipeFullInfoEndpointUrl = "https://api.spoonacular.com/recipes/";

let searchSubmit = document.getElementById("searchField");

function saveRecipe(id) {
  let img = document.getElementById('bigImg');
  let title = document.getElementById('recipeNameBig');

  let newObj = {
    title: title.textContent,
    img: img.src,
    id: id
  }

  let write = JSON.stringify(newObj);

  localStorage.setItem("favorite", write);
}

function renderFavorites() {

  let stringObjectFav = localStorage.getItem("favorite");

  let read = JSON.parse(stringObjectFav);
  
  if (read === null) {

		read = {}

	}else{
	let favoriteSection = document.getElementById('favorites');

    let div = document.createElement('div');
    favoriteSection.appendChild(div);

    let img = document.createElement('img');
    img.src = read.img;
    img.className = 'favoriteImg';
    div.appendChild(img);

    let title = document.createElement('h1');
    title.textContent = read.title;
    title.className = 'favoriteTitle';
    div.appendChild(title);
	}

}

renderFavorites();

searchSubmit.addEventListener("keyup", function() {
  if (event.keyCode === 13) {
    onSearchClicked();
  }
});

async function onSearchClicked() {
  let ingredients = document.getElementById("searchField").value;
  // console.log(ingredients);
  let results = await getRecipes(ingredients);
  // console.log(results);
  clearResults();
  clearRecipe();
  showResults(results);
}

async function getRecipes(ingredients) {
  let url = baseUrl + "&ingredients=" + encodeURIComponent(ingredients) + "&number=2";
  // console.log(url);
  let response = await fetch(url);
  let recipeList = await response.json();
  // console.log(recipeList);
  return recipeList;
}

async function getRecipeFullInfo(item) {
  let url = recipeFullInfoEndpointUrl + item + "/information?includeNutrition=true&apiKey=" + apiKey;
  // console.log(url);
  let response = await fetch(url);
  let recipeInfo = await response.json();
  // console.log(recipeInfo);
  return recipeInfo;
}

function showResults(recipeList) {
  let resultDiv = document.getElementById('resultShow');
  let recipeListWrapper = document.createElement('div');
  recipeListWrapper.innerHTML = "";
  recipeListWrapper.id = 'recipeList';
  resultDiv.appendChild(recipeListWrapper);
  console.log(recipeList);


  for (let i = 0; i < recipeList.length; i++) {

    let recipeEl = document.createElement('div');
    recipeEl.className = 'recipeEl';
    recipeEl.id = recipeList[i].id;
    recipeEl.onclick = function() {
      showRecipe(recipeList[i].id);
    }

    recipeListWrapper.appendChild(recipeEl);

    let recipeImgEl = document.createElement('div');
    recipeImgEl.className = 'thumbnailImg';
    recipeEl.appendChild(recipeImgEl);

    let thumbnailImg = document.createElement('img');
    thumbnailImg.className = "picture";
    thumbnailImg.src = recipeList[i].image;
    recipeImgEl.appendChild(thumbnailImg);

    let recipeInfoEl = document.createElement('div');
    recipeInfoEl.className = 'recipeInfo';
    recipeEl.appendChild(recipeInfoEl);

    let recipeName = document.createElement('h2');
    recipeName.className = 'recipeName';
    recipeName.textContent = recipeList[i].title;
    recipeInfoEl.appendChild(recipeName);
  }
}

function clearRecipe() {
  let clearResults = document.getElementById("resultContent");
  clearResults.innerHTML = "";
  // console.log(clearResults);
}

async function showRecipe(id) {
  clearRecipe();

  let resultContent = document.getElementById("resultContent");

  let recipeFullInfo = await getRecipeFullInfo(id);
  console.log(recipeFullInfo);

  let bigImg = document.createElement('img');
  bigImg.src = recipeFullInfo.image;
  bigImg.className = 'bigImg';
  bigImg.id = 'bigImg';
  resultContent.appendChild(bigImg);

  let recipeInfoEl = document.createElement('div');
  recipeInfoEl.className = 'recipeInfo' + ' ' + 'infoFix';
  resultContent.appendChild(recipeInfoEl);

  let recipeName = document.createElement('h2');
  recipeName.className = 'recipeName' + ' ' + 'infoFix' + ' ' + 'recipeNameBig';
  recipeName.id = 'recipeNameBig';
  recipeName.textContent = recipeFullInfo.title;
  recipeInfoEl.appendChild(recipeName);

  let timeAndServing = document.createElement('div');
  timeAndServing.className = 'timeAndServing';
  recipeInfoEl.appendChild(timeAndServing);

  let servingsEl = document.createElement('div');
  servingsEl.className = 'servingsEl' + ' ' + 'infoFix';
  timeAndServing.appendChild(servingsEl);

  let servings = document.createElement('p');
  servings.className = 'servings';
  if (recipeFullInfo.servings === 1) {
    servings.textContent = recipeFullInfo.servings + ' serving';
  } else {
    servings.textContent = recipeFullInfo.servings + ' servings';
  }
  servingsEl.appendChild(servings);

  let cookingTimeEl = document.createElement('div');
  cookingTimeEl.className = 'cookingTimeEl' + ' ' + 'infoFix';
  timeAndServing.appendChild(cookingTimeEl);

  let cookingTime = document.createElement('p');
  cookingTime.className = 'cookingTime' + ' ' + 'infoFix';
  cookingTime.textContent = recipeFullInfo.readyInMinutes + ' Min';
  cookingTimeEl.appendChild(cookingTime);

  let ingredientsEl = document.createElement('ul');
  ingredientsEl.className = 'ingredientsEl' + ' ' + 'infoFix';
  ingredientsEl.textContent = 'Ingredients: ';
  recipeInfoEl.appendChild(ingredientsEl);

  for (let i = 0; i < recipeFullInfo.extendedIngredients.length; i++) {
    let ingredient = document.createElement('li');
    ingredient.textContent = recipeFullInfo.extendedIngredients[i].original;
    // console.log(ingredient);
    ingredientsEl.appendChild(ingredient);
  }

  let instructionsEl = document.createElement('p');
  instructionsEl.className = 'instructionsEl' + ' ' + 'infoFix';
  instructionsEl.textContent = recipeFullInfo.analyzedInstructions[0].steps[0].step;
  resultContent.appendChild(instructionsEl);

  let sourceEl = document.createElement('a');
  sourceEl.className = 'sourceEl' + ' ' + 'infoFix';
  sourceEl.textContent = 'View full information about this recipe here';
  sourceEl.href = recipeFullInfo.sourceUrl;
  sourceEl.target = '_blank';
  resultContent.appendChild(sourceEl);

  let btnAddToFav = document.createElement('h1');
  btnAddToFav.textContent = 'save to fav';
  btnAddToFav.className = 'btnAddToFav';
  btnAddToFav.onclick = function() {
    saveRecipe(id);
    renderFavorites();
  }
  btnAddToFav.style.color = 'white';
  resultContent.appendChild(btnAddToFav);
}

function clearResults() {
  let resultDiv = document.getElementById('resultShow');
  resultDiv.innerHTML = "";
}

let x = true;

function displayFav() {
  let middleSection = document.getElementById('middle');
  let bigImg = document.getElementById('bigImg');
  let favorites = document.getElementById('favorites');

  if (x) {
    middleSection.style.width = '60%';
    favorites.style.display = 'block';
    if (bigImg === !null) {
      bigImg.style.width = '60%';
    }
    x = false;
  } else {
    middleSection.style.width = '80%';
    favorites.style.display = 'none';
    if (bigImg === !null) {
      bigImg.style.width = '50%';
    }
    x = true;
  }


}
