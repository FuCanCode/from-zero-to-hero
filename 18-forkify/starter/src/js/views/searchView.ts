import icons from '../../img/icons.svg';
import { RecipeBase } from '../types';
import View from './View';

class searchView extends View {
  // #parentEl: HTMLFormElement;
  #inputEl = this.#parentEl.querySelector('.search__field') as HTMLInputElement;

  constructor() {
    super();
    this.setParentEl('search');
    // this.#parentEl = document.querySelector('.search') as HTMLFormElement;
  }

  public getQuery() {
    const query = this.#inputEl.value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#inputEl.value = '';
  }

  public addHandlerSearch(handler: () => void) {
    this.#parentEl.addEventListener('submit', (ev: Event) => {
      ev.preventDefault();
      handler();
    });
  }
}

export default new searchView();
