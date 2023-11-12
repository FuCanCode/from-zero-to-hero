import { RecipeBase, RecipeDetails } from './types';
import { API_URL, DISPLAY_LINES } from './config';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { getJSON } from './helpers';

if (module.hot) {
  module.hot.accept();
}

const state = {
  recipe: {} as RecipeDetails,
  search: {
    query: '',
    results: [] as RecipeBase[],
    page: 1,
    resultsPerPage: DISPLAY_LINES ? DISPLAY_LINES : 10,
  },
};

const loadRecipe = async function (id: string): Promise<void> {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    const sourceObj = data.data.recipe;
    const recipe: RecipeDetails = {
      id: sourceObj.id,
      title: sourceObj.title,
      publisher: sourceObj.publisher,
      sourceURL: sourceObj.source_url,
      image: sourceObj.image_url,
      servings: sourceObj.servings,
      cookingTime: sourceObj.cooking_time,
      ingredients: sourceObj.ingredients,
    };

    state.recipe = recipe;
  } catch (error) {
    throw error;
  }
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const searchAPI = async function (keyword: string): Promise<RecipeBase[]> {
  try {
    state.search.query = keyword;

    const data = await getJSON(`${API_URL}?search=${keyword}`);

    const results = data.data.recipes;

    const recipes: RecipeBase[] = results.map((result: any) => {
      return {
        id: result.id,
        image: result.image_url,
        title: result.title,
        publisher: result.publisher,
      };
    });

    state.search.results = recipes;

    return recipes;
  } catch (err) {
    throw err;
  }
};

const getSearchResultsPage = function (page: number): RecipeBase[] {
  const start = (page - 1) * DISPLAY_LINES;
  const end = page * DISPLAY_LINES;

  return state.search.results.slice(start, end);
};

export { state, loadRecipe, searchAPI, getSearchResultsPage };
