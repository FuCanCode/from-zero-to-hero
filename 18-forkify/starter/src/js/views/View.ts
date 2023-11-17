import {
  RecipeDetails,
  RecipeBase,
  ResultsViewData,
  Page,
} from '../../js/types';
import icons from '../../img/icons.svg';

class View {
  protected parentEl!: HTMLDivElement | HTMLFormElement;
  protected errMsg = 'Error';
  protected succMsg = 'Success';
  protected data = {} as
    | RecipeDetails
    | RecipeDetails[]
    | RecipeBase[]
    | ResultsViewData
    | Page;

  // methods to be called in the subclass constructor
  public setParentEl(className: string) {
    this.parentEl = document.querySelector(`.${className}`) as
      | HTMLDivElement
      | HTMLFormElement;
  }

  public setErrMsg(msg: string) {
    this.errMsg = msg;
  }

  public render(
    dataInput:
      | RecipeDetails
      | RecipeDetails[]
      | RecipeBase[]
      | ResultsViewData
      | Page
  ) {
    if (!dataInput || (Array.isArray(dataInput) && dataInput.length === 0))
      return this.renderError();
    // sets the data prop of the class
    this.data = dataInput;
    // guard clause
    if (!this.parentEl) return;
    // clean up container before inserting new html
    this.clear();
    const markup = this.generateMarkup();
    this.parentEl.insertAdjacentHTML('beforeend', markup);
  }

  public update(
    dataInput: RecipeDetails | RecipeBase[] | ResultsViewData | Page
  ) {
    this.data = dataInput;

    const newMarkup = this.generateMarkup();

    // creating a virtual DOM for comparison
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // select all newly created Elements
    const newElements = [...newDOM.querySelectorAll('*')];
    // select all existing elements
    const currentElements = [...this.parentEl.querySelectorAll('*')];
    // Loop and look for differences
    newElements.forEach((newEl, i) => {
      const curEl = currentElements[i];

      // Update text values
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue?.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Update data-attribute
      if (!newEl.isEqualNode(curEl)) {
        [...newEl.attributes].forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
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
