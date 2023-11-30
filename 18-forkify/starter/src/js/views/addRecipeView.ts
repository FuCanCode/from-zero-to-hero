import View from './View';
import { RecipeFormData } from '../types';
import icons from '../../img/icons.svg';

class AddRecipeView extends View {
  #window = document.querySelector('.add-recipe-window') as HTMLDivElement;
  #overlay = document.querySelector('.overlay') as HTMLDivElement;
  #modal = [this.#overlay, this.#window];

  #btnOpen = document.querySelector(
    '.nav__btn--add-recipe'
  ) as HTMLButtonElement;
  #btnClose = document.querySelector('.btn--close-modal') as HTMLButtonElement;

  constructor() {
    super();
    this.setParentEl('upload');

    // handler doesn't need to be called in the controller
    // so handler will be attached when class is instanciated
    this.addHandlerToggleModal();
  }

  public toggleModal() {
    this.#modal.forEach(el => el.classList.toggle('hidden'));
  }

  public resetForm() {
    this.parentEl.innerHTML = `
    <div class="upload__column">
    <h3 class="upload__heading">Recipe data</h3>
    <label>Title</label>
    <input value="TEST86" required name="title" type="text" />
    <label>URL</label>
    <input value="TEST86" required name="sourceUrl" type="text" />
    <label>Image URL</label>
    <input value="TEST86" required name="image" type="text" />
    <label>Publisher</label>
    <input value="TEST86" required name="publisher" type="text" />
    <label>Prep time</label>
    <input value="23" required name="cookingTime" type="number" />
    <label>Servings</label>
    <input value="23" required name="servings" type="number" />
  </div>

  <div class="upload__column">
    <h3 class="upload__heading">Ingredients</h3>
    <label>Ingredient 1</label>
    <input
      value="0.5,kg,Rice"
      type="text"
      required
      name="ingredient-1"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 2</label>
    <input
      value="1,,Avocado"
      type="text"
      name="ingredient-2"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 3</label>
    <input
      value=",,salt"
      type="text"
      name="ingredient-3"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 4</label>
    <input
      type="text"
      name="ingredient-4"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 5</label>
    <input
      type="text"
      name="ingredient-5"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 6</label>
    <input
      type="text"
      name="ingredient-6"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
  </div>
  <button class="btn upload__btn">
          <svg>
            <use href="${icons}#icon-upload-cloud"></use>
          </svg>
          <span>Upload</span>
        </button>
    `;
  }

  protected addHandlerToggleModal() {
    [this.#btnOpen, this.#btnClose, this.#overlay].forEach(el =>
      el.addEventListener('click', () => {
        this.resetForm();
        this.toggleModal();
      })
    );
  }

  private convertFormDataToRecipeObject(
    formDataElement: HTMLFormElement
  ): RecipeFormData {
    const dataArr = [...new FormData(formDataElement)];
    const data = {} as RecipeFormData;

    dataArr.forEach(([key, value]) => {
      const propKey = key as keyof RecipeFormData;
      data[propKey] = value as string;
    });

    return data;
  }

  addHandlerSubmit(handler: (formData: RecipeFormData) => void) {
    this.parentEl.addEventListener('submit', ev => {
      ev.preventDefault();

      if (!(this.parentEl instanceof HTMLFormElement)) return;

      const data: RecipeFormData = this.convertFormDataToRecipeObject(
        this.parentEl
      );

      handler(data);
    });
  }
}

export default new AddRecipeView();
