let apiKey = "ff7d6e71b4244599a7b3c29ceb43f384";
let apiKeyAlt = "90b4bf234e22493e89325b6f9cce868e";
let apiKeyAlt2 = "410ef8bc76654549b955c1fb5a1ba3ed";

let baseUrl = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + apiKey;
let recipeFullInfoEndpointUrl = "https://api.spoonacular.com/recipes/";

let searchSubmit = document.getElementById("searchField");

let read = [];

function saveRecipe(id) {
  let img = document.getElementById('bigImg');
  let title = document.getElementById('recipeNameBig');

  let newObj = {
    title: title.textContent,
    img: img.src,
    id: id
  }

  let found = false;

  for (var i = 0; i < read.length; i++) {
    if (newObj.id === read[i].id) {
      found = true;
    }
  }

  if (!found) {
    read.push(newObj);
  }

  let write = JSON.stringify(read);

  localStorage.setItem("favorites", write);
}

function renderFavorites() {

  let stringObjectFav = localStorage.getItem("favorites");

  read = JSON.parse(stringObjectFav);

  if (read === null) {

    read = [];

  } else {

    let favoriteSection = document.getElementById('favoritesWrap');
    favoriteSection.innerHTML = "";

    for (var i = 0; i < read.length; i++) {
      let div = document.createElement('div');
      div.className = 'favDiv';
      let id = read[i].id;
      div.onclick = function() {
        showRecipe(id);
      }
      favoriteSection.appendChild(div);

      let img = document.createElement('img');
      img.src = read[i].img;
      img.className = 'favoriteImg';
      div.appendChild(img);

      let title = document.createElement('h1');
      title.textContent = read[i].title;
      title.className = 'favoriteTitle';
      div.appendChild(title);
    }

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
  let results = await getRecipes(ingredients);
  clearResults();
  clearRecipe();
  showResults(results);
}

async function getRecipes(ingredients) {
  let url = baseUrl + "&ingredients=" + encodeURIComponent(ingredients) + "&number=4";
  let response = await fetch(url);
  let recipeList = await response.json();
  return recipeList;
}

async function getRecipeFullInfo(item) {
  let url = recipeFullInfoEndpointUrl + item + "/information?includeNutrition=true&apiKey=" + apiKey;
  let response = await fetch(url);
  let recipeInfo = await response.json();
  return recipeInfo;
}

function showResults(recipeList) {
  let resultDiv = document.getElementById('resultShow');
  let recipeListWrapper = document.createElement('div');
  recipeListWrapper.innerHTML = "";
  recipeListWrapper.id = 'recipeList';
  resultDiv.appendChild(recipeListWrapper);

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
}

async function showRecipe(id) {
  clearRecipe();

  let resultContent = document.getElementById("resultContent");

  let recipeFullInfo = await getRecipeFullInfo(id);

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
    servings.textContent = recipeFullInfo.servings + ' Serving';
  } else {
    servings.textContent = recipeFullInfo.servings + ' Servings';
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

  let btnAddToFav = document.createElement('i');
  btnAddToFav.className = 'far fa-heart favSave';
  btnAddToFav.onclick = function() {
    saveRecipe(id);
    renderFavorites();
  }
  timeAndServing.appendChild(btnAddToFav);

}

function clearResults() {
  let resultDiv = document.getElementById('resultShow');
  resultDiv.innerHTML = "";
}

let rendered = true;

function displayFav() {
  let middleSection = document.getElementById('middle');
  let bigImg = document.getElementById('bigImg');
  let favorites = document.getElementById('favorites');

  if (rendered) {
    middleSection.style.width = '60%';
    favorites.style.display = 'block';
    if (bigImg === !null) {
      bigImg.style.width = '60%';
    }
    rendered = false;
  } else {
    middleSection.style.width = '80%';
    favorites.style.display = 'none';
    if (bigImg === !null) {
      bigImg.style.width = '46%';
    }
    rendered = true;
  }

}
