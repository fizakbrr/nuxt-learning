const key = (categorySlug: string, recipeSlug: string) => `${categorySlug}/${recipeSlug}`

export const useFavoritesStore = defineStore('favorites', () => {
  const favorited = ref(new Set<string>())

  const initialize = async () => {
    const data = await $fetch<FavoriteRef[]>('/api/favorites')
    favorited.value = new Set(data.map((f) => key(f.categorySlug, f.recipeSlug)))
  }

  // Re-fetch whenever auth state changes, so logging in mid-session (no page
  // reload) still picks up favorites, and logging out clears them.
  const user = useSupabaseUser()
  watch(
    user,
    () => {
      if (user.value) initialize()
      else favorited.value = new Set()
    },
    { immediate: true }
  )

  const isFavorite = (categorySlug: string, recipeSlug: string) =>
    favorited.value.has(key(categorySlug, recipeSlug))

  const toggleFavorite = async (categorySlug: string, recipeSlug: string) => {
    const k = key(categorySlug, recipeSlug)
    const wasFavorited = favorited.value.has(k)

    // Optimistic update, rolled back below if the request fails.
    if (wasFavorited) favorited.value.delete(k)
    else favorited.value.add(k)

    try {
      await $fetch(`/api/favorites/${categorySlug}/${recipeSlug}`, {
        method: 'PUT',
        body: { favorited: !wasFavorited }
      })
    } catch (error) {
      if (wasFavorited) favorited.value.add(k)
      else favorited.value.delete(k)
      throw error
    }
  }

  return { isFavorite, toggleFavorite, initialize }
})
