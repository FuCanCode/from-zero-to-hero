interface ResultsRange {
  start: number;
  end: number;
}
interface Ingredients {
  quantity: number;
  unit: '' | 'cups' | 'tbsps';
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

interface FormData {
  cookingTime: string;
  image: string;
  ing1: string;
  ing2: string;
  ing3: string;
  ing4: string;
  ing5: string;
  ing6: string;
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
  FormData,
};
