import { renderSearchItem } from './render';
// Testing
const searchResultsContainer = document.querySelector(
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
console.log('test');
