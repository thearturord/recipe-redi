function onSearchClicked() {
    let ingredients = document.getElementById("search").value;
    console.log(ingredients);
    getRecipes(ingredients);
}

async function getRecipes(ingredients) {
    console.log(ingredients);
    let response = await fetch("https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/");
    let recipeListObj = await response.json();
    let recipeList = recipeListObj.results;
    console.log(recipeList);
    
    let recipeListWrapper = document.createElement('div');
    recipeListWrapper.id = 'recipeList';
    document.body.appendChild(recipeListWrapper);

    for (let i = 0; i < recipeList.length; i++) {
        let recipeEl = document.createElement('div');
        recipeEl.className = 'recipeEl';
        recipeListWrapper.appendChild(recipeEl);

        let recipeImgEl = document.createElement('div');
        recipeImgEl.className = 'thumbnailImg';
        recipeEl.appendChild(recipeImgEl);

        let thumbnailImg = document.createElement('img');
        thumbnailImg.src = recipeList[i].thumbnail;
        recipeImgEl.appendChild(thumbnailImg);

        let recipeInfoEl = document.createElement('div');
        recipeInfoEl.className = 'recipeInfo';
        recipeEl.appendChild(recipeInfoEl);

        let recipeName = document.createElement('h2');
        recipeName.className = 'recipeName';
        recipeName.textContent = recipeList[i].title;
        recipeInfoEl.appendChild(recipeName);
    }
    return recipeList;
}

