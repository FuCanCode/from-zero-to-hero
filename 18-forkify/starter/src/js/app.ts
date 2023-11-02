import recipeView from './views/recipeView';
import * as model from './model';
import { RecipeDetails } from './types';
import * as searchView from './views/searchView';
import { API_URL } from './config';
import { getJSON } from './helpers';

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

  const controlRecipe = async function (): Promise<void> {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    await model.loadRecipe(id); // Fetches data and stores it in model.state
    recipeView.render(model.state.recipe);
  };

  const showResults = async function () {
    const results = await model.searchAPI(inputSearch.value);

    if (!results) return;

    searchView.renderSearchResults(results);
  };

  const init = function () {
    // Subscriptions
    recipeView.addHandlerRender(controlRecipe);
  };
  init();

  // Search Button
  btnSearch.addEventListener('click', async function (ev) {
    ev.preventDefault();
    showResults();
    console.log(model.state);
  });
};
app();
