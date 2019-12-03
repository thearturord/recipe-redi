
let apiKey = "ff7d6e71b4244599a7b3c29ceb43f384";
let apiKeyAlt = "90b4bf234e22493e89325b6f9cce868e";

let baseUrl = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + apiKey;

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
    showResults(results);
}

async function getRecipes(ingredients) {
    let url = baseUrl + "&ingredients=" + encodeURIComponent(ingredients) + "&number=3";
    // console.log(url);
    let response = await fetch(url);
    let recipeList = await response.json();
    // console.log(recipeList);
    return recipeList;
}

function showResults(recipeList) {
    let resultDiv = document.getElementById('results');
    let recipeListWrapper = document.createElement('div');
    recipeListWrapper.innerHTML = "";
    recipeListWrapper.id = 'recipeList';
    resultDiv.appendChild(recipeListWrapper);
    console.log(recipeList);

    for (let i = 0; i < recipeList.length; i++) {

        let recipeEl = document.createElement('div');
        recipeEl.className = 'recipeEl';
        recipeEl.id = recipeList[i].id;
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

async function renderInfo(){

      let middleBox = document.getElementById("middle");

      let infoUrl = "https://api.spoonacular.com/recipes/716429/information?includeNutrition=false";





}
