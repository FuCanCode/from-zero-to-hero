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
      const dataArr = [...new FormData(this.parentEl)];
      const data = Object.fromEntries(dataArr);
      console.dir(data);

      handler(data);
    });
  }
}

export default new AddRecipeView();
