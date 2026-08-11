export const useFavorites = () => {
  const favorites = useLocalStorage<string[]>('cookbook-favorites', [])

  const isFavorite = (recipeSlug: string) => favorites.value.includes(recipeSlug)

  const toggleFavorite = (recipeSlug: string) => {
    if (isFavorite(recipeSlug)) {
      favorites.value = favorites.value.filter((slug) => slug !== recipeSlug)
    } else {
      favorites.value = [...favorites.value, recipeSlug]
    }
  }

  return { favorites, isFavorite, toggleFavorite }
}
