import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import * as model from './model';
import { RecipeDetails } from './types';
import paginationView from './views/paginationView';

// Testing
console.log('Testing...');

////////////////////////////
/// App
const app = async function () {
  let currentRecipe: RecipeDetails | null;

  const controlServings = function (newServings: number) {
    // set state
    model.updateServingsIngredients(newServings);

    // render recipe
    recipeView.update(model.state.recipe);
  };

  const controlRecipe = async function (): Promise<void> {
    try {
      const id = window.location.hash.slice(1);
      if (!id) return;

      recipeView.renderSpinner();

      resultsView.update(model.getSearchResultsPage());

      await model.loadRecipe(id); // Fetches data and stores it in model.state
      if (!model.state.recipe.id) throw new Error("Couldn't find recipe!");

      recipeView.render(model.state.recipe);
    } catch (error) {
      if (error instanceof Error) recipeView.renderError();
    }
  };

  const controlPagination = function (goTo: number = 1) {
    // results control
    const results = model.getSearchResultsPage(goTo);
    resultsView.render(results);

    // pagination buttons
    const currentPage = model.state.search.page;
    const lastPage = model.getLastPage();
    paginationView.render({ currentPage, lastPage });
  };

  const controlSearchResults = async function () {
    try {
      resultsView.renderSpinner();

      const query = searchView.getQuery();
      if (!query) return;

      await model.searchAPI(query);

      if (!model.state.search.results) {
        return;
      }

      // Display results according to current page
      controlPagination();
    } catch (error) {
      console.log(error);
    }
  };

  const init = function () {
    // Subscriptions
    recipeView.addHandlerRender(controlRecipe);
    recipeView.addHandlerServings(controlServings);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
  };
  init();
};
app();
