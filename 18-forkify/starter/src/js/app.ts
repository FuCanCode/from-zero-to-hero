import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import * as model from './model';
import { RecipeDetails } from './types';
import { calcRange } from './helpers';
import { DISPLAY_LINES } from './config';

// Testing
console.log('Testing...');

////////////////////////////
/// App
const app = async function () {
  let currentRecipe: RecipeDetails | null;

  const controlRecipe = async function (): Promise<void> {
    try {
      const id = window.location.hash.slice(1);
      if (!id) return;

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

      // Display results according to current page
      const results = model.state.search.results;
      const range = calcRange(model.state.search.page, DISPLAY_LINES);
      resultsView.render(results, range.start, range.end);
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
