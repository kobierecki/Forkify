import Search from './models/Search';
import * as searchView from  './views/searchView';
import {elements, renderLoader, clearLoader} from "./views/base";

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
        renderLoader(elements.searchResults);
        // SEARCH FOR RECIPES
        await state.search.getResults();
        // RENDER RESULTS ON THE UI
        clearLoader();
        searchView.renderResults(state.search.result);
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