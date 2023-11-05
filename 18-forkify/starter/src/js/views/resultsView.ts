import icons from '../../img/icons.svg';
import { RecipeBase } from '../types';
import { DISPLAY_LINES } from '../config';

class resultsView {
  #parentEl = document.querySelector('.results') as HTMLUListElement;
  #page = 1;

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
    this.#parentEl.append(recipeElement);
    return recipeElement;
  }

  public render(results: RecipeBase[]) {
    const range = {
      start: this.#page * DISPLAY_LINES,
      end: (this.#page + 1) * DISPLAY_LINES - 1,
    };

    for (let i = range.start; i <= range.end; i++) {
      this.#renderSearchItem(results[i]);
    }
  }

  // increases the page value
  public nextPage(searchResultsLength: number) {
    const max = Math.trunc(searchResultsLength / DISPLAY_LINES);
    this.#page = this.#page < max ? this.#page++ : max;
  }

  // decrease page value
  public previousPage() {
    this.#page = this.#page > 0 ? this.#page-- : 0;
  }
}

export default new resultsView();
