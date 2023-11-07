import { DISPLAY_LINES } from '../config';
import icons from '../../img/icons.svg';

class paginationView {
  #paginationContainer = document.querySelector(
    '.pagination'
  ) as HTMLDivElement;

  #generateMarkup(page: number) {
    const prevButton =
      page === 0
        ? ''
        : `<button class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${page}</span>
  </button>`;
    const nextButton = `
  <button class="btn--inline pagination__btn--next">
    <span>Page ${page + 2}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`;
  }

  // increases the page value
  public nextPage(searchResultsLength: number) {
    const max = Math.trunc(searchResultsLength / DISPLAY_LINES);
    this.#page = this.#page < max ? this.#page++ : max;
  }

  // decrease page value
  public previousPage() {
    this.#page = this.#page > 0 ? this.#page-- : 0;
  }
}

export default new paginationView();
