import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from  './views/searchView';
import * as recipeView from  './views/recipeView';
import {elements, renderLoader, clearLoader} from "./views/base";

// GLOBAL STATE
// Search object
// Current recipe object
// Shopping list object
// Liked recipes

const state = {};

// SEARCH CONTROLLER

const controlSearch = async () => {
    // GET QUERY FROM VIEW
    const query = searchView.getInput();
    //const query = 'pizza';

    if (query) {
        // NEW SEARCH OBJECT AND ADD TO STATE
        state.search = new Search(query);
        // PREPARE UI FOR RESULTS
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResults);

        try {
            // SEARCH FOR RECIPES
            await state.search.getResults();
            // RENDER RESULTS ON THE UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (error) {
            alert ('Search processing went wrong!');
            clearLoader();
        }
    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

// TESTING
// window.addEventListener('load', e => {
//     e.preventDefault();
//     controlSearch();
// });

elements.searchResultsPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
        console.log(goToPage);
    }
});

// RECIPE CONTROLLER

const controlRecipe = async () => {
    // GET ID
    const id = window.location.hash.replace('#', '');
    console.log(id);
    if (id){
        // PREPARE UI FOR CHANGES
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //HIGHLIGHT SELECTED SEARCH ITEM
        if(state.search) searchView.highlightSelected(id);

        // CREATE NEW RECIPE OBJECT
        state.recipe = new Recipe(id);

        // TESTING
        //window.r = state.recipe;
        
        try {
            // GET RECIPE DATA AND PARSE INGREDIENTS
            await state.recipe.getRecipe();
            console.log(state.recipe.ingredients);
            state.recipe.parseIngredients();
            // CALC SERVINGS AND TIME
            state.recipe.calcServings();
            state.recipe.calcTime();
            // RENDER RECIPE
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch (error) {
            alert('Error processing recipe!');
        }
    }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// HANDLING RECIPE BUTTON CLICKS

elements.recipe.addEventListener('click', e => {
   if(e.target.matches('.btn_decrease, .btn_decrease *')){
       if(state.recipe.servings > 1){
           state.recipe.updateServings('dec');
           recipeView.updateServingsIngredients(state.recipe);
       }
   } else if (e.target.matches('.btn_increase, .btn_increase *')){
       state.recipe.updateServings('inc');
       recipeView.updateServingsIngredients(state.recipe);
   }
});