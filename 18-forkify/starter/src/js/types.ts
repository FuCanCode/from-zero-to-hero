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
}

interface State {
  recipe: RecipeDetails;
}

export { Ingredients, RecipeBase, RecipeDetails, State };
