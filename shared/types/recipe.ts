export interface RecipeSummary {
  slug: string
  title: string
  cookTime: string
  description: string
}

export interface Recipe extends RecipeSummary {
  ingredients: string[]
  steps: string[]
}

export interface CategoryMeta {
  slug: string
  title: string
  recipeCount: number
  premium: boolean
}

export interface CategoryWithRecipes {
  slug: string
  title: string
  premium: boolean
  recipes: RecipeSummary[]
}

export interface FavoriteRef {
  categorySlug: string
  recipeSlug: string
}
