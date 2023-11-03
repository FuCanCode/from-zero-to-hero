import * as model from '../model';
import icons from '../../img/icons.svg';
import { RecipeBase } from '../types';

class searchView {
  #parentEl = document.querySelector('.search') as HTMLFormElement;
  #inputEl = this.#parentEl.querySelector('.search__field') as HTMLInputElement;

  public getQuery() {
    const query = this.#inputEl.value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#inputEl.value = '';
  }

  public addHandlerSearch(handler: () => void) {
    this.#parentEl.addEventListener('submit', (ev: Event) => {
      ev.preventDefault();
      handler();
    });
  }
}

const searchResultsContainer = document.querySelector(
  '.results'
) as HTMLUListElement;

const renderSearchItem = function (recipe: RecipeBase): HTMLLIElement {
  const recipeElement = document.createElement('li');
  const id = recipe.id;
  const img = recipe.image;
  const title = recipe.title;
  const publisher = recipe.publisher;
  const html = `<a class="preview__link" href="#${id}">
      <figure class="preview__fig">
        <img src="${img}" alt="Picture of ${title}" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${title}</h4>
        <p class="preview__publisher">${publisher}</p>
        <div class="preview__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
      </div>
    </a>`;

  recipeElement.innerHTML = html;
  searchResultsContainer.append(recipeElement);
  return recipeElement;
};

const renderSearchResults = function (results: RecipeBase[]) {
  results.forEach(recipe => {
    renderSearchItem(recipe);
  });
};

export { renderSearchResults };
export default new searchView();
