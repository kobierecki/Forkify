import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from  './views/searchView';
import * as recipeView from  './views/recipeView';
import * as listView from  './views/listView';
import {elements, renderLoader, clearLoader} from "./views/base";

// GLOBAL STATE
// Search object
// Current recipe object
// Shopping list object
// Liked recipes

const state = {};
window.state = state;

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
    }
});

// RECIPE CONTROLLER

const controlRecipe = async () => {
    // GET ID
    const id = window.location.hash.replace('#', '');
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

// HANDLE DELETE AND UPDATE LIST

elements.shopping.addEventListener('click', e => {
   const id = e.target.closest('.shopping__item').dataset.itemid;
   // HANDLE DELETE EVENT
    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        // DELETE FROM STATE
        state.list.deleteItem(id);
        // DELETE FROM UI
        listView.deleteItem(id);
    } else if (e.target.matches('.shopping__count-value')){
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});


// LIST CONTROLLER

const controlList = () => {
    // IF LIST DOESNT EXIST CREATE A NEW ONE
    if (!state.list) state.list = new List();
    // INGREDIENT TO THE LIST
    state.recipe.ingredients.forEach(el => {
      const item  =  state.list.addItem(el.count, el.unit, el.ingredient);
      listView.renderItem(item);
    });
};

// HANDLING RECIPE BUTTON CLICKS

elements.recipe.addEventListener('click', e => {
   if(e.target.matches('.btn-decrease, .btn-decrease *')){
       if(state.recipe.servings > 1){
           state.recipe.updateServings('dec');
           recipeView.updateServingsIngredients(state.recipe);
       }
   } else if (e.target.matches('.btn-increase, .btn-increase *')){
       state.recipe.updateServings('inc');
       recipeView.updateServingsIngredients(state.recipe);
   } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        controlList();
   }
});

const l = new List();
window.l = l;