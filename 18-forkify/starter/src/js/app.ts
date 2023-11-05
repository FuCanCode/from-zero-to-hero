import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import * as model from './model';
import { RecipeDetails } from './types';
import * as TMP from './views/searchView';

// Testing
console.log('Testing...');

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

  const controlSearchResults = async function () {
    try {
      const query = searchView.getQuery();
      if (!query) return;

      await model.searchAPI(query);

      if (!model.state.search.results) return;

      resultsView.render(model.state.search.results);
    } catch (error) {
      console.log(error);
    }
  };

  const init = function () {
    // Subscriptions
    recipeView.addHandlerRender(controlRecipe);
    searchView.addHandlerSearch(controlSearchResults);
  };
  init();
};
app();
