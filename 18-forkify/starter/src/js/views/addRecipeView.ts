import View from './View';
import { Ingredients, RecipeDetails } from '../types';
import { v4 as uuidv4 } from 'uuid';

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

  addHandlerSubmit(handler: (formData: Object) => void) {
    this.parentEl.addEventListener('submit', ev => {
      ev.preventDefault();

      if (!(this.parentEl instanceof HTMLFormElement)) return;
      const dataArr = [...new FormData(this.parentEl)] as [string, string][];
      const ingredients: Ingredients[] = dataArr.slice(6).map(ing => {
        const qty = Number(ing[1].split(',')[0] || '');
        const unit = ing[1].split(',')[1] || '';
        const description = ing[1].split(',')[2] || '';
        return {
          quantity: qty,
          unit: unit,
          description: description,
        };
      });
      const id = uuidv4();
      console.log(ingredients);

      const data = Object.fromEntries(dataArr.slice(0, 6));
      const recipe = { ...data, ingredients: ingredients, id: id };
      console.dir(recipe);

      handler(data);
    });
  }
}

export default new AddRecipeView();
