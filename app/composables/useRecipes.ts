import recipes from '~/data/recipes.json'

export interface Recipe {
  slug: string
  title: string
  cookTime: string
  description: string
  ingredients: string[]
  steps: string[]
}

export interface Category {
  slug: string
  title: string
  recipes: Recipe[]
}

export const useRecipes = () => {
  const categories = recipes as Category[]

  const getCategory = (categorySlug: string) =>
    categories.find((c) => c.slug === categorySlug)

  const getRecipe = (categorySlug: string, recipeSlug: string) =>
    getCategory(categorySlug)?.recipes.find((r) => r.slug === recipeSlug)

  return { categories, getCategory, getRecipe }
}
