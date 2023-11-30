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
  key?: string;
}

interface RecipeDetails extends RecipeBase {
  sourceURL: string;
  ingredients: Ingredients[];
  servings: number;
  cookingTime: number;
  bookmarked?: boolean;
}

interface RecipeFormatUpload {
  cooking_time: number;
  image_url: string;
  ingredients: Ingredients[];
  publisher: string;
  servings: number;
  source_url: string;
  title: string;
}
interface RecipeFormatDownload extends RecipeFormatUpload {
  id: string;
}

interface CustomRecipe extends RecipeFormatDownload {
  key: string;
  createdAt: string;
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
  publisher: string;
  servings: string;
  sourceUrl: string;
  title: string;
  ['ingredient-1']: string;
  ['ingredient-2']: string;
  ['ingredient-3']: string;
  ['ingredient-4']: string;
  ['ingredient-5']: string;
  ['ingredient-6']: string;
}

export {
  ResultsViewData,
  Ingredients,
  RecipeBase,
  RecipeDetails,
  State,
  Page,
  RecipeFormData,
  RecipeFormatDownload,
  RecipeFormatUpload,
  CustomRecipe,
};
