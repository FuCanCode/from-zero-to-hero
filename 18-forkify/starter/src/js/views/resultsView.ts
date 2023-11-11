import { RecipeBase } from '../types';
import View from './View';

class resultsView extends View {
  data = {} as RecipeBase[];

  constructor() {
    super();
    this.setParentEl('results');
    this.setErrMsg('Nothing found for this query 😱');
  }

  #renderSearchItem(recipe: RecipeBase): string {
    const id = recipe.id;
    const img = recipe.image;
    const title = recipe.title;
    const publisher = recipe.publisher;
    const html = `
      <li>
        <a class="preview__link" href="#${id}">
          <figure class="preview__fig">
            <img src="${img}" alt="Picture of ${title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${title}</h4>
            <p class="preview__publisher">${publisher}</p>
            
          </div>
        </a>
      </li>`;

    return html;
  }

  protected generateMarkup() {
    this.clear();
    const itemList = this.data.reduce((list: string, recipe: RecipeBase) => {
      return list + this.#renderSearchItem(recipe);
    }, '');
    return itemList;
  }
}

export default new resultsView();
