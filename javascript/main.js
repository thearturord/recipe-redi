let apiKey = "90b4bf234e22493e89325b6f9cce868e";

let randomRecipesUrl = "https://api.spoonacular.com/recipes/random?apiKey=" + apiKey + "&number=2";

let recipesByIngredientsUrl = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + apiKey + "&number=2";

let recipeFullInfoEndpointUrl = "https://api.spoonacular.com/recipes/";

let favouriteRecipes = localStorage.getItem('favouriteRecipes');
if (favouriteRecipes === null) {
    favouriteRecipes = [];
} else {
    favouriteRecipes = JSON.parse(favouriteRecipes);
}

function saveFavouriteRecipes() {
    localStorage.setItem('favouriteRecipes', JSON.stringify(favouriteRecipes));

}

async function onSearchClicked() {
    let userInput = document.getElementById("searchField").value;
    let results = await searchRecipesByIngredients(userInput);
    showResults(results);
}

async function getRandomRecepies() {
    let response = await fetch(randomRecipesUrl);
    let recipeList = await response.json();
    return recipeList.recipes;
}

async function showRandomRecipes() {
    let results = await getRandomRecepies();
    showResults(results);
}

async function searchRecipesByIngredients(items) {
    let url = recipesByIngredientsUrl + "&ingredients=" + encodeURIComponent(items);
    // console.log(url);
    let response = await fetch(url);
    let recipeList = await response.json();
    // console.log(recipeList);
    return recipeList;
}

function showResults(recipeList) {
    clearResults();
    clearRecipe();

    let allElements = [];

    for (let i = 0; i < recipeList.length; i++) {
        let recipeEl = document.createElement('div');
        allElements.push(recipeEl);
        recipeEl.className = 'recipeListEl';
        recipeEl.onclick = function () {
            showRecipe(recipeList[i].id);

            for (let el of allElements) {
                el.classList.remove('selected');
            }

            recipeEl.classList.add('selected');
        }
        document.getElementById("recipeListSection").appendChild(recipeEl);

        let thumbnailImg = document.createElement('img');
        thumbnailImg.className = 'thumb';
        thumbnailImg.src = recipeList[i].image;
        recipeEl.appendChild(thumbnailImg);

        let recipeInfoEl = document.createElement('div');
        recipeInfoEl.className = 'recipeListInfo';
        recipeEl.appendChild(recipeInfoEl);

        let recipeName = document.createElement('h2');
        recipeName.className = 'recipeListName';
        recipeName.textContent = recipeList[i].title;
        recipeInfoEl.appendChild(recipeName);
    }
}

function clearResults() {
    let clearResults = document.getElementById("recipeListSection");
    clearResults.innerHTML = "";
}

async function getRecipeFullInfo(item) {
    let url = recipeFullInfoEndpointUrl + item + "/information?includeNutrition=true&apiKey=" + apiKey;
    // console.log(url);
    let response = await fetch(url);
    let recipeInfo = await response.json();
    // console.log(recipeInfo);
    return recipeInfo;
}

async function showRecipe(id) {
    clearRecipe();

    let recipeFullInfo = await getRecipeFullInfo(id);
    console.log(recipeFullInfo);

    let bigImg = document.createElement('img');
    bigImg.src = recipeFullInfo.image;
    document.getElementById("recipeSection").appendChild(bigImg);


    let recipeInfoEl = document.createElement('div');
    recipeInfoEl.className = 'recipeInfo';
    document.getElementById("recipeSection").appendChild(recipeInfoEl);


    let recipeName = document.createElement('h2');
    recipeName.className = 'recipeName';
    recipeName.textContent = recipeFullInfo.title;
    recipeInfoEl.appendChild(recipeName);


    let iconsWrapper = document.createElement('div');
    iconsWrapper.className = 'iconsWrapper';
    recipeInfoEl.appendChild(iconsWrapper);

    let servingsEl = document.createElement('div');
    servingsEl.className = 'servingsEl';
    iconsWrapper.appendChild(servingsEl);

    let utensilsIcon = document.createElement('i');
    utensilsIcon.className = 'fas fa-utensils';
    servingsEl.appendChild(utensilsIcon);

    let servings = document.createElement('span');
    servings.className = 'servings';
    if (recipeFullInfo.servings === 1) {
        servings.textContent = recipeFullInfo.servings + ' serving';
    } else {
        servings.textContent = recipeFullInfo.servings + ' servings';
    }
    servingsEl.appendChild(servings);


    let cookingTimeEl = document.createElement('div');
    cookingTimeEl.className = 'cookingTimeEl';
    iconsWrapper.appendChild(cookingTimeEl);

    let clockIcon = document.createElement('i');
    clockIcon.className = 'far fa-clock';
    cookingTimeEl.appendChild(clockIcon);

    let cookingTime = document.createElement('span');
    cookingTime.className = 'cookingTime';
    cookingTime.textContent = recipeFullInfo.readyInMinutes + ' min';
    cookingTimeEl.appendChild(cookingTime);


    let heartEl = document.createElement('div');
    heartEl.className = 'heartEl';
    iconsWrapper.appendChild(heartEl);

    let heartIcon = document.createElement('i');
    heartIcon.className = 'fas fa-heart';
    heartEl.appendChild(heartIcon);


    let infoWrapper = document.createElement('div');
    infoWrapper.className = 'infoWrapper';
    recipeInfoEl.appendChild(infoWrapper);

    let ingredientsWrapper = document.createElement('div');
    ingredientsWrapper.className = 'ingredientsWrapper';
    infoWrapper.appendChild(ingredientsWrapper);

    let ingredientsWrapperName = document.createElement('p');
    ingredientsWrapperName.className = 'ingredientsWrapperName';
    ingredientsWrapperName.textContent = 'Ingredients:';
    ingredientsWrapper.appendChild(ingredientsWrapperName);

    let ingredientsEl = document.createElement('ul');
    ingredientsEl.className = 'ingredientsEl';
    ingredientsWrapper.appendChild(ingredientsEl);

    for (let i = 0; i < recipeFullInfo.extendedIngredients.length; i++) {
        let ingredient = document.createElement('li');
        ingredient.textContent = recipeFullInfo.extendedIngredients[i].original;
        // console.log(ingredient);
        ingredientsEl.appendChild(ingredient);
    }

    let instructionsWrapper = document.createElement('div');
    instructionsWrapper.className = 'instructionsWrapper';
    infoWrapper.appendChild(instructionsWrapper);

    let instructionsWrapperName = document.createElement('p');
    instructionsWrapperName.className = 'instructionsWrapperName';
    instructionsWrapperName.textContent = 'Preparation:';
    instructionsWrapper.appendChild(instructionsWrapperName);

    let instructionsEl = document.createElement('p');
    instructionsEl.className = 'instructionsEl';
    instructionsEl.textContent = recipeFullInfo.instructions;
    instructionsWrapper.appendChild(instructionsEl);
}

function clearRecipe() {
    let clearResults = document.getElementById("recipeSection");
    clearResults.innerHTML = "";
    // console.log(clearResults);
}

showRandomRecipes();