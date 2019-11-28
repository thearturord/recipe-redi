
//
// let square = document.getElementById('hi');
//
// function hola(){
//
//   square.style.display = 'block';
//   square.className = '';
//
// }


let apiKey = "ff7d6e71b4244599a7b3c29ceb43f384";
let apiKeyAlt = "90b4bf234e22493e89325b6f9cce868e";

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
    let recipeListWrapper = document.createElement('div');
    recipeListWrapper.innerHTML = "";
    recipeListWrapper.id = 'recipeList';
    document.body.appendChild(recipeListWrapper);
    console.log(recipeList);

    for (let i = 0; i < recipeList.length; i++) {
        let recipeEl = document.createElement('div');
        recipeEl.className = 'recipeEl';
        recipeListWrapper.appendChild(recipeEl);

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
