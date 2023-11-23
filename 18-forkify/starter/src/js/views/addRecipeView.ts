import View from './View';

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
  }

  toggleModal() {
    this.#modal.forEach(el => el.classList.toggle('hidden'));
  }

  addHandlerToggleModal() {
    [this.#btnOpen, this.#btnClose, this.#overlay].forEach(el =>
      el.addEventListener('click', () => {
        this.toggleModal();
      })
    );
  }

  addHandlerSubmit(handler: () => void) {
    this.parentEl.addEventListener('submit', handler);
  }
}

export default new AddRecipeView();
