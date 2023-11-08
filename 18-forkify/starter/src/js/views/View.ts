import { RecipeDetails } from '../../js/types';
import icons from '../../img/icons.svg';

class View {
  #parentEl: HTMLElement | null;
  #errMsg = '';
  #succMsg = '';
  #data = {} as RecipeDetails;

  constructor() {
    this.#parentEl = null;
  }

  public setParentEl(className: string) {
    this.#parentEl = document.querySelector(`.${className}`);
  }

  public render(recipe: RecipeDetails) {
    this.#data = recipe;
    const markup = this.#generateMarkup();
    this.#clear();
    if (this.#parentEl) this.#parentEl.innerHTML = markup;
  }

  #clear() {
    if (this.#parentEl) this.#parentEl.innerHTML = '';
  }

  #generateMarkup(): string {
    return '';
  }

  public renderSpinner(): void {
    const html = `
      <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
      `;

    this.#clear;
    if (this.#parentEl) this.#parentEl.insertAdjacentHTML('afterbegin', html);
  }

  public renderError(message: string = this.#errMsg) {
    const markup = `
      <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>
      `;

    this.#clear();
    if (this.#parentEl) this.#parentEl.innerHTML = markup;
  }

  public renderSuccessMsg(message: string = this.#succMsg) {
    const markup = `
      <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-smile"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>
      `;

    this.#clear();
    if (this.#parentEl) this.#parentEl.innerHTML = markup;
  }
}

export default View;
