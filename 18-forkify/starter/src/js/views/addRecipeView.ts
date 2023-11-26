import View from './View';
import { RecipeFormData } from '../types';

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

  protected addHandlerToggleModal() {
    [this.#btnOpen, this.#btnClose, this.#overlay].forEach(el =>
      el.addEventListener('click', () => {
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
