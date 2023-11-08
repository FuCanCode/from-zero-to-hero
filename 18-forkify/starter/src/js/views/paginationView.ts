import { DISPLAY_LINES } from '../config';
import icons from '../../img/icons.svg';

class paginationView {
  #paginationContainer = document.querySelector(
    '.pagination'
  ) as HTMLDivElement;
  #btnPrev;
  #btnNext;

  // Constructor generates markup and assign buttons
  constructor() {
    this.#generateMarkUp();
    this.#btnPrev = document.querySelector(
      '.pagination__btn--prev'
    ) as HTMLButtonElement;
    this.#btnNext = document.querySelector(
      '.pagination__btn--next'
    ) as HTMLButtonElement;
  }

  // Change text content and toggle hidden
  updateButtons(page: number, lastPage: number) {
    const prevText = this.#btnPrev.querySelector('span') as HTMLSpanElement;
    const nextText = this.#btnNext.querySelector('span') as HTMLSpanElement;
    prevText.textContent = `Page ${page}`;
    nextText.textContent = `Page ${page + 2}`;

    // Remove prevBtn if on first page
    if (page === 0) {
      this.#btnPrev.classList.add('hidden');
    } else this.#btnPrev.classList.remove('hidden');

    // Remove nexBtn on last page
    if (page === lastPage - 1) {
      this.#btnNext.classList.add('hidden');
    } else this.#btnNext.classList.remove('hidden');
  }

  #generateMarkUp() {
    this.#paginationContainer.innerHTML = `<button class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span></span>
  </button>
  <button class="btn--inline pagination__btn--next">
    <span></span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`;
  }

  render(page: number, max: number) {
    const prevButton =
      page === 0
        ? ''
        : `<button class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${page}</span>
  </button>`;
    const nextButton =
      page < max - 1
        ? `
  <button class="btn--inline pagination__btn--next">
    <span>Page ${page + 2}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`
        : '';

    this.#paginationContainer.innerHTML = prevButton + nextButton;
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

export default new paginationView();
