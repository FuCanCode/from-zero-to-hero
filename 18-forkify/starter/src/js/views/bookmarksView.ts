import View from './View';

class BookmarksView extends View {
  constructor() {
    super();
    this.setParentEl('bookmarks__list');
  }

  protected generateMarkup() {
    return '<h2>Hello BoOkMaRkS</h2>';
  }

  public addHandlerOnload(handler: any) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarksView();
