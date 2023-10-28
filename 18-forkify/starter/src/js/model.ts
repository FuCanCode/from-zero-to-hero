import Fraction from 'fraction.js';
import { Ingredients, RecipeBase, RecipeDetails } from './types';
import icons from '../img/icons.svg';
import { renderSpinner } from './views/recipeView';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe') as HTMLDivElement;

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

const showRecipe = async function (): Promise<RecipeDetails | null> {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return null;

    renderSpinner(recipeContainer);

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

    console.log(recipe);

    // Render recipe
    const ingredientsHTML = recipe.ingredients.reduce(
      (html: string, ing: Ingredients): string => {
        return (
          html +
          `<li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${new Fraction(ing.quantity).toFraction(
        true
      )}</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ing.unit}</span>
        ${ing.description}
      </div>
    </li>`
        );
      },
      ''
    );
    const finalHtml = `
    <figure class="recipe__fig">
    <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${recipe.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--decrease-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round">
      <svg class="">
        <use href="${icons}#icon-bookmark-fill"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
      ${ingredientsHTML}
    </ul>
  </div>

  <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.sourceURL}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
    `;

    recipeContainer.innerHTML = finalHtml;

    return recipe;
  } catch (err) {
    console.log(err);
    return null;
  }
};

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

    return recipes;

    console.log(recipes);
  } catch (err) {
    alert(err);
    return null;
  }
};
// searchAPI('sada');

export { searchAPI, showRecipe };
