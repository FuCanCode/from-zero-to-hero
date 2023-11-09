import View from './View';

class searchView extends View {
  protected inputEl;

  constructor() {
    super();
    this.setParentEl('search');
    // this.parentEl = document.querySelector(".search") as HTMLFormElement
    this.inputEl = this.parentEl.querySelector(
      '.search__field'
    ) as HTMLInputElement;
  }

  public getQuery() {
    const query = this.inputEl.value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.inputEl.value = '';
  }

  public addHandlerSearch(handler: () => void) {
    this.parentEl.addEventListener('submit', (ev: Event) => {
      ev.preventDefault();
      handler();
    });
  }
}

export default new searchView();
