import { renderSearchResults } from './render';
import { searchAPI, showRecipe } from './controller';
import { RecipeBase } from './types';
// Testing
console.log('Testing...');
showRecipe('5ed6604591c37cdc054bca57');

/* const searchResultsContainer = document.querySelector(
  '.results'
) as HTMLUListElement;
const testItem = {
  publisher: 'Closet Cooking',
  image_url:
    'http://forkify-api.herokuapp.com/images/BBQChickenPizzawithCauliflowerCrust5004699695624ce.jpg',
  title: 'Cauliflower Pizza Crust (with BBQ Chicken Pizza)',
  id: '5ed6604591c37cdc054bcc13',
};
searchResultsContainer.append(renderSearchItem(testItem));
console.log('test'); */

//////////////////////////////////
/// Elements
const btnSearch = document.querySelector('.search__btn') as HTMLButtonElement;
const inputSearch = document.querySelector(
  '.search__field'
) as HTMLInputElement;

btnSearch.addEventListener('click', async function (ev) {
  ev.preventDefault();
  const searchResults: RecipeBase[] = await searchAPI(inputSearch.value);
  console.log(searchResults);

  renderSearchResults(searchResults);
  // console.log(searchResults);
});
