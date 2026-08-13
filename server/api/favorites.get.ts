import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event): Promise<FavoriteRef[]> => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const favorites = await prisma.favorite.findMany({
    where: { userId: user.sub, favorited: true },
    select: { categorySlug: true, recipeSlug: true }
  })

  return favorites
})
