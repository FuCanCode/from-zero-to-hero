import { Ingredients, RecipeBase, RecipeDetails } from './types';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
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

const showRecipe = async function (
  id: string
): Promise<RecipeDetails | undefined> {
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`${data.message} (${response.status})`);
    }

    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceURL: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(recipe);

    return recipe;
  } catch (err) {
    alert(err);
  }
};
showRecipe('5ed6604591c37cdc054bca57');

const searchAPI = async function (keyword: string) {
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${keyword}`
    );

    const data = await response.json();
    const recipes = data.data.recipes;

    console.log(recipes);
  } catch (err) {
    alert(err);
  }
};
searchAPI('pizza');
