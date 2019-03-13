import Search from './models/Search';

// GLOBAL STATE
// Search object
// Current recipe object
// Shopping list object
// Liked recipes

const state = {};

const controlSearch = async () => {
    // GET QUERY FROM VIEW
    const query = 'pizza';
    if (query) {
        // NEW SEARCH OBJECT AND ADD TO STATE
        state.search = new Search(query);
        // PREPARE UI FOR RESULTS
        // SEARCH FOR RECIPES
        await state.search.getResults();
        // RENDER RESULTS ON THE UI
        console.log(state.search.result);
    };
};

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

const search = new Search('pizza');
search.getResults('pizza');