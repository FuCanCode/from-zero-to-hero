import { RecipeDetails, RecipeBase, ResultsViewData } from '../../js/types';
import icons from '../../img/icons.svg';

class View {
  protected parentEl!: HTMLDivElement | HTMLFormElement;
  protected errMsg = 'Error';
  protected succMsg = 'Success';
  protected data = {} as RecipeDetails | RecipeBase[] | ResultsViewData;

  // method to be called in the subclass constructor
  public setParentEl(className: string) {
    this.parentEl = document.querySelector(`.${className}`) as
      | HTMLDivElement
      | HTMLFormElement;
  }

  public render(dataInput: RecipeDetails | RecipeBase[] | ResultsViewData) {
    // sets the data prop of the class
    this.data = dataInput;
    // guard clause
    if (!this.parentEl) return;
    // clean up container before inserting new html
    this.clear();
    const markup = this.generateMarkup();
    this.parentEl.insertAdjacentHTML('beforeend', markup);
  }

  protected clear() {
    if (this.parentEl) this.parentEl.innerHTML = '';
  }

  protected generateMarkup(): string {
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

    this.clear();
    if (this.parentEl) this.parentEl.insertAdjacentHTML('afterbegin', html);
  }

  public renderError(message: string = this.errMsg) {
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

    this.clear();
    if (this.parentEl) this.parentEl.innerHTML = markup;
  }

  public renderSuccessMsg(message: string = this.succMsg) {
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

    this.clear();
    if (this.parentEl) this.parentEl.innerHTML = markup;
  }
}

export default View;
