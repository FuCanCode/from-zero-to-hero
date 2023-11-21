import { RecipeBase } from '../types';
import View from './View';
import previewView from './previewView';

class resultsView extends View {
  data = {} as RecipeBase[];

  constructor() {
    super();
    this.setParentEl('results');
    this.setErrMsg('Nothing found for this query 😱');
  }

  protected generateMarkup() {
    return this.data.map(result => previewView.render(result, false)).join('');
  }
}

export default new resultsView();
