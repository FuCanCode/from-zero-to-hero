import { renderSearchResults } from './render';
import { searchAPI, showRecipe } from './model';
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

  /// Search Button
  btnSearch.addEventListener('click', async function (ev) {
    ev.preventDefault();
    const searchResults: RecipeBase[] | null = await searchAPI(
      inputSearch.value
    );

    if (searchResults === null) return;

    renderSearchResults(searchResults);
  });

  /// Render recipe on hashchange and load
  ['hashchange', 'load'].forEach(ev => addEventListener(ev, showRecipe));
};
app();
