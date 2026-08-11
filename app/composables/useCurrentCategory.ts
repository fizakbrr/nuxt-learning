// Combines useRoute() with useRecipes() so pages don't repeat the same lookup.
export const useCurrentCategory = () => {
  const route = useRoute()
  const { getCategory } = useRecipes()

  return computed(() => getCategory(route.params.category as string))
}
