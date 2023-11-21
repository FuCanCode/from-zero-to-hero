import { RecipeDetails } from '../types';
import previewView from './previewView';
import View from './View';

class BookmarksView extends View {
  data = {} as RecipeDetails[];

  constructor() {
    super();
    this.setParentEl('bookmarks__list');
    this.setErrMsg('No bookmarks yet!');
  }

  protected generateMarkup() {
    return this.data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }

  public addHandlerOnload(handler: any) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarksView();
