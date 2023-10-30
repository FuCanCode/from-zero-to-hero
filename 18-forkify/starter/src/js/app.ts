import recipeView from './views/recipeView';
import * as model from './model';
import { RecipeDetails } from './types';
import * as searchView from './views/searchView';
// Testing
console.log('Testing...');

//////////////////////////////////
/// Elements
const btnSearch = document.querySelector('.search__btn') as HTMLButtonElement;
const inputSearch = document.querySelector(
  '.search__field'
) as HTMLInputElement;

////////////////////////////
/// App
const app = async function () {
  let currentRecipe: RecipeDetails | null;

  const controlRecipe = async function () {
    const id = window.location.hash.slice(1);
    if (!id) return null;

    recipeView.renderSpinner();

    await model.loadRecipe(id); // Fetches data and stores it in model.state
    recipeView.render(model.state.recipe);
  };

  const showResults = async function () {
    const results = await model.searchAPI(inputSearch.value);

    if (!results) return;

    searchView.renderSearchResults(results);
  };

  /// Render recipe on hashchange and load
  ['hashchange', 'load'].forEach(ev => addEventListener(ev, controlRecipe));

  // Search Button
  btnSearch.addEventListener('click', async function (ev) {
    ev.preventDefault();
    showResults();
    console.log(model.state);
  });
};
app();
