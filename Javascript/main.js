
let apiKey = "ff7d6e71b4244599a7b3c29ceb43f384";
let apiKeyAlt = "90b4bf234e22493e89325b6f9cce868e";

let baseUrl = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + apiKey;
let recipeFullInfoEndpointUrl = "https://api.spoonacular.com/recipes/";

let searchSubmit = document.getElementById("searchField");

searchSubmit.addEventListener("keyup", function(){
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
        recipeEl.onclick = function () {
            showRecipe(recipeList[i].id);}
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
    resultContent.appendChild(bigImg);

    let recipeInfoEl = document.createElement('div');
    recipeInfoEl.className = 'recipeInfo';
    resultContent.appendChild(recipeInfoEl);

    let recipeName = document.createElement('h2');
    recipeName.className = 'recipeName';
    recipeName.textContent = recipeFullInfo.title;
    recipeInfoEl.appendChild(recipeName);

    let servingsEl = document.createElement('div');
    servingsEl.className = 'servingsEl';
    recipeInfoEl.appendChild(servingsEl);

    let servings = document.createElement('p');
    servings.className = 'servings';
    if (recipeFullInfo.servings === 1) {
        servings.textContent = recipeFullInfo.servings + ' serving';
    } else {
        servings.textContent = recipeFullInfo.servings + ' servings';
    }
    servingsEl.appendChild(servings);

    let cookingTimeEl = document.createElement('div');
    cookingTimeEl.className = 'cookingTimeEl';
    recipeInfoEl.appendChild(cookingTimeEl);

    let cookingTime = document.createElement('p');
    cookingTime.className = 'cookingTime';
    cookingTime.textContent = recipeFullInfo.readyInMinutes + ' Min';
    cookingTimeEl.appendChild(cookingTime);

    let ingredientsEl = document.createElement('ul');
    ingredientsEl.className = 'ingredientsEl';
    ingredientsEl.textContent = 'Ingredients: ';
    recipeInfoEl.appendChild(ingredientsEl);

    for (let i=0; i < recipeFullInfo.extendedIngredients.length; i++) {
        let ingredient = document.createElement('li');
        ingredient.textContent = recipeFullInfo.extendedIngredients[i].original;
        // console.log(ingredient);
        ingredientsEl.appendChild(ingredient);
    }
}

function clearResults() {
    let resultDiv = document.getElementById('resultShow');
    resultDiv.innerHTML = "";
}
