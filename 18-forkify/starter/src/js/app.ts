import { renderSearchResults } from './render';
import { searchAPI, showRecipe } from './controller';
import { RecipeBase, RecipeDetails } from './types';
// Testing
console.log('Testing...');
showRecipe('5ed6604591c37cdc054bca57').then(output => console.log(output));

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
  currentRecipe = await showRecipe('5ed6604591c37cdc054bca57'); // Testing

  /// Search Button
  btnSearch.addEventListener('click', async function (ev) {
    ev.preventDefault();
    const searchResults: RecipeBase[] | null = await searchAPI(
      inputSearch.value
    );

    if (searchResults === null) return;

    renderSearchResults(searchResults);
  });

  /// Select recipe from Search
  window.addEventListener('hashchange', function (ev) {
    const id = ev.newURL.split('#')[1];
    showRecipe(id);
  });
};
app();
