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
    try {
      const id = window.location.hash.slice(1);

      recipeView.renderSpinner();

      await model.loadRecipe(id); // Fetches data and stores it in model.state
      if (!model.state.recipe.id) throw new Error("Couldn't find recipe!");

      recipeView.render(model.state.recipe);
    } catch (error) {
      if (error instanceof Error) recipeView.renderError();
    }
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
