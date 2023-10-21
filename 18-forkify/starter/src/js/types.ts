interface Ingredients {
  quantity: number;
  unit: '' | 'cups' | 'tbsps';
  description: string;
}

interface RecipeBase {
  id: string;
  image_url: string;
  publisher: string;
  title: string;
}

interface RecipeDetails extends RecipeBase {
  source_url: string;
  ingredients: Ingredients[];
  servings: number;
}

export { Ingredients, RecipeBase, RecipeDetails };
