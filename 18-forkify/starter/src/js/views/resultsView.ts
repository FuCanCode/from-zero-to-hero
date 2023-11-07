import icons from '../../img/icons.svg';
import { RecipeBase } from '../types';
import { DISPLAY_LINES } from '../config';

class resultsView {
  #resultsContainer = document.querySelector('.results') as HTMLUListElement;

  #renderSearchItem(recipe: RecipeBase): HTMLLIElement {
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
    this.#resultsContainer.append(recipeElement);
    return recipeElement;
  }

  public render(results: RecipeBase[], start: number, end: number) {
    for (let i = start; i <= end; i++) {
      this.#renderSearchItem(results[i]);
    }
  }
}

export default new resultsView();
