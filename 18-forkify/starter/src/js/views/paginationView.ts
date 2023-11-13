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
    return `
    <button data-goto="${
      currentPage - 1
    }" class="btn--inline pagination__btn--prev ${
      currentPage === 1 ? 'hidden' : ''
    }">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
    </button>

    <button data-goto="${
      currentPage + 1
    }" class="btn--inline pagination__btn--next ${
      currentPage === lastPage ? 'hidden' : ''
    }">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>`;
  }

  addHandlerClick(handler: (followingPage: number) => void) {
    this.parentEl.addEventListener('click', function (ev) {
      if (!(ev.target instanceof HTMLElement)) return;

      const btn = ev.target.closest('.btn--inline') as HTMLButtonElement;

      // Define what page will be rendered next with help of the goto-attribute
      const goTo = Number(btn.dataset.goto);
      console.log(goTo);

      if (typeof goTo !== 'number') return;

      handler(goTo);
    });
  }
}

export default new PaginationView();
