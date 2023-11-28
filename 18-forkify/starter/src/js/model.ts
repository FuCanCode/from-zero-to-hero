import {
  Ingredients,
  RecipeBase,
  RecipeDetails,
  RecipeFormData,
} from './types';
import { API_URL, DISPLAY_LINES, API_KEY } from './config';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { getJSON } from './helpers';
import { v4 as uuidv4 } from 'uuid';

if (module.hot) {
  module.hot.accept();
}

////////////////////////////////////
/// state
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

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
/// API
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

    // Check if recipe is already bookmarked
    if (state.bookmarks.some(bm => bm.id === id)) {
      recipe.bookmarked = true;
    } else {
      recipe.bookmarked = false;
    }

    state.recipe = recipe;
  } catch (error) {
    throw error;
  }
};

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

////////////////////////
/// Page
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

////////////////////////////////
/// Ingredients
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

////////////////////////////////
/// Bookmarks
const isBookmarked = function (id: string): boolean {
  return state.bookmarks.find(bm => bm.id === id) ? true : false;
};

const addBookmark = function (recipe: RecipeDetails) {
  // Check if recipe already in bookmarks
  if (isBookmarked(recipe.id)) return;

  // add bookmarked flag to recipe
  state.recipe.bookmarked = true;

  state.bookmarks.push(recipe);

  saveBookmarks();
};

const removeBookmark = function (id: string) {
  if (!isBookmarked(id)) return;

  state.recipe.bookmarked = false;

  const indexOfBM = state.bookmarks.findIndex(bm => bm.id === id);
  state.bookmarks.splice(indexOfBM, 1);

  saveBookmarks();
};

////////////////////////////
/// Save/Load bookmarks
const saveBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

const loadBookmarks = function () {
  const savedBookmarks = localStorage.getItem('bookmarks');
  if (!savedBookmarks) return;
  state.bookmarks = JSON.parse(savedBookmarks);
};

////////////////////////////
/// Custom recipes
const uploadRecipe = async function (formData: RecipeFormData) {
  try {
    const newId = uuidv4();
    const ingredients: Ingredients[] = Object.entries(formData)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr: string[] = ing[1].split(',');
        if (ingArr.length !== 3)
          throw new Error(
            'Please use the correct format shown in the placeholder!'
          );

        const [quantity, unit, description] = [...ingArr];
        return {
          quantity: Number(quantity),
          unit,
          description,
        };
      });

    const newRecipe: RecipeDetails = {
      id: newId,
      cookingTime: +formData.cookingTime,
      image: formData.image,
      ingredients: ingredients,
      publisher: formData.publisher,
      servings: +formData.servings,
      sourceURL: formData.sourceUrl,
      title: formData.title,
      bookmarked: true,
    };

    const url = `${API_URL}?key=${API_KEY}`;

    // fetch(url, { method: 'POST', body: JSON.stringify(newRecipe) });
    console.log(newRecipe);
  } catch (err) {
    throw err;
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
  removeBookmark,
  loadBookmarks,
  uploadRecipe,
};
