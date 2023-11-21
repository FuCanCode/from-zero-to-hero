import { RecipeBase, RecipeDetails } from '../types';
import View from './View';

class PreviewView extends View {
  data = {} as RecipeDetails | RecipeBase;

  protected generateMarkup() {
    const id = window.location.hash.slice(1);
    const item = this.data;

    return `
      <li class="preview">
        <a class="preview__link ${
          id === item.id ? 'preview__link--active' : ''
        }" href="#${item.id}">
          <figure class="preview__fig">
            <img src="${item.image}" alt="${item.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${item.title}</h4>
            <p class="preview__publisher">${item.publisher}</p>
          </div>
        </a>
      </li>
      `;
  }
}

export default new PreviewView();
