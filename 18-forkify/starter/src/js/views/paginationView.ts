import icons from '../../img/icons.svg';
import View from './View';
import { Page } from '../types';

class PaginationView extends View {
  data = {} as Page;
  #btnPrev = document.querySelector(
    '.pagination__btn--prev'
  ) as HTMLButtonElement;
  #btnNext = document.querySelector(
    '.pagination__btn--next'
  ) as HTMLButtonElement;

  constructor() {
    super();
    this.setParentEl('pagination');
  }

  generateMarkup() {
    const currentPage = this.data.currentPage;
    const lastPage = this.data.lastPage;
    return `<button class="btn--inline pagination__btn--prev ${
      currentPage === 1 ? 'hidden' : ''
    }">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${currentPage - 1}</span>
  </button>
  <button class="btn--inline pagination__btn--next ${
    currentPage === lastPage - 1 ? 'hidden' : ''
  }">
    <span>Page ${currentPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`;
  }

  addHandlerPrev(
    handlerPrev: (this: HTMLButtonElement, ev: MouseEvent) => any
  ) {
    this.#btnPrev.addEventListener('click', handlerPrev);
  }

  addHandlerNext(
    handlerNext: (this: HTMLButtonElement, ev: MouseEvent) => any
  ) {
    this.#btnNext.addEventListener('click', handlerNext);
  }
}

export default new PaginationView();
