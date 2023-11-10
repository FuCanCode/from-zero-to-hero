import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import * as model from './model';
import { RecipeDetails } from './types';
import { calcRange, calcMaxPage } from './helpers';
import { DISPLAY_LINES } from './config';
import paginationView from './views/paginationView';

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

  const controlPagination = function () {
    // pagination buttons
    const currentPage = model.state.search.page;
    const lastPage = calcMaxPage();
    paginationView.render({ currentPage, lastPage });

    // results control
    const range = calcRange(currentPage, DISPLAY_LINES);
    const results = model.state.search.results.slice(
      range.start,
      range.end + 1
    );
    resultsView.render(results);
  };

  const addPaginationHandler = function () {
    const controlPrev = function () {
      model.state.search.page =
        model.state.search.page > 0 ? model.state.search.page - 1 : 0;

      controlPagination();
    };

    const controlNext = function () {
      const max = calcMaxPage();

      model.state.search.page =
        model.state.search.page < max ? model.state.search.page + 1 : max;

      controlPagination();
    };
    paginationView.addHandlerPrev(controlPrev);
    paginationView.addHandlerNext(controlNext);
  };

  const controlSearchResults = async function () {
    try {
      const query = searchView.getQuery();
      if (!query) return;

      await model.searchAPI(query);

      if (!model.state.search.results) return;

      // Display results according to current page
      controlPagination();
      addPaginationHandler();
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
