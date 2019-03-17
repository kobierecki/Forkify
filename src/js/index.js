import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from  './views/searchView';
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
    console.log(query);
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
        // CREATE NEW RECIPE OBJECT
        state.recipe = new Recipe(id);
        
        try {
            // GET RECIPE DATA
            await state.recipe.getRecipe();
            // CALC SERVINGS AND TIME
            state.recipe.calcServings();
            state.recipe.calcTime();
            // RENDER RECIPE
            console.log(state.recipe);   
        } catch (error) {
            alert('Error processing recipe!');
        }
    }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));