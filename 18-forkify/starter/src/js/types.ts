interface ResultsRange {
  start: number;
  end: number;
}
interface Ingredients {
  quantity: number;
  unit: string;
  description: string;
}

interface RecipeBase {
  id: string;
  image: string;
  publisher: string;
  title: string;
}

interface RecipeDetails extends RecipeBase {
  sourceURL: string;
  ingredients: Ingredients[];
  servings: number;
  cookingTime: number;
  bookmarked?: boolean;
}

interface Page {
  currentPage: number;
  lastPage: number;
}

interface State {
  recipe: RecipeDetails;
}

interface ResultsViewData {
  results: RecipeBase[];
  range: ResultsRange;
}

interface RecipeFormData {
  cookingTime: string;
  image: string;
  ['ingredient-1']: string;
  ['ingredient-2']: string;
  ['ingredient-3']: string;
  ['ingredient-4']: string;
  ['ingredient-5']: string;
  ['ingredient-6']: string;
  publisher: string;
  servings: string;
  sourceUrl: string;
  title: string;
}

export {
  ResultsViewData,
  Ingredients,
  RecipeBase,
  RecipeDetails,
  State,
  Page,
  RecipeFormData,
};
