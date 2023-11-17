import { RecipeDetails } from '../types';
import View from './View';

class BookmarksView extends View {
  data = {} as RecipeDetails[];

  constructor() {
    super();
    this.setParentEl('bookmarks__list');
  }

  protected generateMarkup() {
    console.log(this.data);

    return this.data
      .map((bm: RecipeDetails) => {
        return `
      <li class="preview">
        <a class="preview__link" href="#${bm.id}">
          <figure class="preview__fig">
            <img src="${bm.image}" alt="${bm.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${bm.title}</h4>
            <p class="preview__publisher">${bm.publisher}</p>
          </div>
        </a>
      </li>
      `;
      })
      .join();
  }

  public addHandlerOnload(handler: any) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarksView();
