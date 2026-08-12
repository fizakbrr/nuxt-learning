export const useCurrentCategory = () => {
  const route = useRoute()
  const categorySlug = route.params.category as string

  return useFetchWithCache<CategoryWithRecipes>(`/api/categories/${categorySlug}/recipes`)
}
