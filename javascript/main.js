let apiKey = "90b4bf234e22493e89325b6f9cce868e";

let baseUrl = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + apiKey;

async function onSearchClicked() {
    let ingredients = document.getElementById("searchField").value;
    // console.log(ingredients);
    let results = await getRecipes(ingredients);
    // console.log(results);
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

function showResults(recipeList) {
    let clearResults = document.getElementById("recipeList");
    clearResults.innerHTML = "";
    // console.log(recipeList);

    for (let i = 0; i < recipeList.length; i++) {
        let recipeEl = document.createElement('div');
        recipeEl.className = 'recipeEl';
        recipeEl.onclick = function() {showRecipe(recipeList[i]);}
        document.getElementById("recipeList").appendChild(recipeEl);

        let recipeImgEl = document.createElement('div');
        recipeImgEl.className = 'thumbnailImg';
        recipeEl.appendChild(recipeImgEl);

        let thumbnailImg = document.createElement('img');
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

function showRecipe(recipe) {
    console.log(recipe.title);
    let clearResults = document.getElementById("recipe");
    clearResults.innerHTML = "";

    let recipeEl = document.createElement('div');
    recipeEl.className = 'recipeEl';
    document.getElementById('recipe').appendChild(recipeEl);

    let recipeImgEl = document.createElement('div');
    recipeImgEl.className = 'bigImg';
    recipeEl.appendChild(recipeImgEl);

    let thumbnailImg = document.createElement('img');
    thumbnailImg.src = recipe[i].image;
    recipeImgEl.appendChild(thumbnailImg);

    let recipeInfoEl = document.createElement('div');
    recipeInfoEl.className = 'recipeInfo';
    recipeEl.appendChild(recipeInfoEl);

    let recipeName = document.createElement('h2');
    recipeName.className = 'recipeName';
    recipeName.textContent = recipe[i].title;
    recipeInfoEl.appendChild(recipeName);

}