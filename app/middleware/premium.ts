// Assumes the `auth` middleware already ran and the user is logged in.
export default defineNuxtRouteMiddleware(async (to) => {
  const headers = import.meta.server ? useRequestHeaders(['cookie']) : undefined

  const categories = await $fetch<CategoryMeta[]>('/api/categories', { headers })
  const category = categories.find((c) => c.slug === to.params.category)

  if (!category?.premium) return

  const { purchased } = await $fetch<{ purchased: boolean }>('/api/purchase/status', { headers })
  if (!purchased) return navigateTo('/')
})
