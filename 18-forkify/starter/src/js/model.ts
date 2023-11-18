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
  bookmarks: [] as RecipeDetails[],
};

const saveRecipes = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

const loadRecipes = function () {
  state.bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
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

const getSearchResultsPage = function (
  page: number = state.search.page
): RecipeBase[] {
  state.search.page = page;

  const start = (page - 1) * DISPLAY_LINES;
  const end = page * DISPLAY_LINES;

  return state.search.results.slice(start, end);
};

const getLastPage = (): number =>
  Math.ceil(state.search.results.length / state.search.resultsPerPage);

const updateServingsIngredients = function (
  desiredServings: number = state.recipe.servings
): void {
  const factor = desiredServings / state.recipe.servings;

  // adjust servings and ingredients
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * factor;
  });
  state.recipe.servings = desiredServings;
};

const isBookmarked = function (id: string): boolean {
  return state.bookmarks.find(bm => bm.id === id) ? true : false;
};

const addBookmark = function (recipe: RecipeDetails) {
  // Check if recipe already in bookmarks
  if (isBookmarked(recipe.id)) return;

  // add bookmarked flag to recipe
  state.recipe.bookmarked = true;

  state.bookmarks.push(state.recipe);
};

const getBookmarkedRecipe = function (id: string): RecipeDetails {
  if (isBookmarked(id)) {
    return state.bookmarks.find(bm => bm.id === id);
  }
};

export {
  state,
  loadRecipe,
  searchAPI,
  getSearchResultsPage,
  getLastPage,
  updateServingsIngredients,
  isBookmarked,
  addBookmark,
  getBookmarkedRecipe,
};
