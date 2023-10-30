import { RecipeBase, RecipeDetails } from './types';
import { renderSpinner } from './views/recipeView';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const state = {
  recipe: {} as RecipeDetails,
  searchResults: [] as RecipeBase[],
};

const loadRecipe = async function (id: string): Promise<void> {
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`${data.message} (${response.status})`);
    }

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
    alert(error);
  }
};

const timeout = function (s: number) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
if (module.hot) {
  module.hot.accept();
}

const searchAPI = async function (
  keyword: string
): Promise<RecipeBase[] | null> {
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${keyword}`
    );

    const data = await response.json();
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
    state.searchResults = recipes;
    return recipes;
  } catch (err) {
    alert(err);
    return null;
  }
};
// searchAPI('sada');

export { state, loadRecipe, searchAPI };
