import * as recipeView from './views/recipeView';
import * as model from './model';
import { RecipeBase, RecipeDetails } from './types';
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

  const showRecipe = async function () {
    const id = window.location.hash.slice(1);
    if (!id) return null;

    recipeView.renderSpinner(recipeView.recipeContainer);

    await model.loadRecipe(id);
    recipeView.renderRecipe(model.state.recipe);
  };

  /// Render recipe on hashchange and load
  ['hashchange', 'load'].forEach(ev => addEventListener(ev, showRecipe));

  /// Search Button
  // btnSearch.addEventListener('click', async function (ev) {
  //   ev.preventDefault();
  //   const searchResults: RecipeBase[] | null = await searchAPI(
  //     inputSearch.value
  //   );

  //   if (searchResults === null) return;

  //   renderSearchResults(searchResults);
  // });
};
app();
