// Combines useRoute() with useRecipes() so pages don't repeat the same lookup.
export const useCurrentRecipe = () => {
  const route = useRoute()
  const { getRecipe } = useRecipes()

  return computed(() =>
    getRecipe(route.params.category as string, route.params.recipe as string)
  )
}
