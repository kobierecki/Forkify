import Search from './models/Search';
import * as searchView from  './views/searchView';
import {elements} from "./views/base";

// GLOBAL STATE
// Search object
// Current recipe object
// Shopping list object
// Liked recipes

const state = {};

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
        // SEARCH FOR RECIPES
        await state.search.getResults();
        // RENDER RESULTS ON THE UI
        searchView.renderResults(state.search.result)
    };
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

// search.getResults();