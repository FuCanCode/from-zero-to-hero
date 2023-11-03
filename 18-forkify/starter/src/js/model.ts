import { RecipeBase, RecipeDetails } from './types';
import { API_URL } from './config';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { getJSON } from './helpers';

const state = {
  recipe: {} as RecipeDetails,
  search: {
    query: '',
    results: [] as RecipeBase[],
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
if (module.hot) {
  module.hot.accept();
}

const searchAPI = async function (keyword: string): Promise<RecipeBase[]> {
  try {
    state.search.query = keyword;

    const data = await getJSON(`${API_URL}?search=${keyword}`);

    if (!data.results) throw new Error("Couldn't find anything.");

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
// searchAPI('sada');

export { state, loadRecipe, searchAPI };
