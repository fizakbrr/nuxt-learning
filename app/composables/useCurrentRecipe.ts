// Not cached (unlike useCurrentCategory): this is the auth-protected endpoint,
// and caching it would risk showing stale data after logout.
export const useCurrentRecipe = () => {
  const route = useRoute()
  const categorySlug = route.params.category as string
  const recipeSlug = route.params.recipe as string

  return useFetch<Recipe>(`/api/categories/${categorySlug}/recipes/${recipeSlug}`)
}
