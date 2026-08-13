import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const categorySlug = getRouterParam(event, 'category')!
  const recipeSlug = getRouterParam(event, 'recipe')!
  const body = await readBody<{ favorited: boolean }>(event)

  if (typeof body?.favorited !== 'boolean') {
    throw createError({ statusCode: 400, statusMessage: '"favorited" must be a boolean' })
  }

  await prisma.favorite.upsert({
    where: {
      userId_categorySlug_recipeSlug: { userId: user.sub, categorySlug, recipeSlug }
    },
    update: { favorited: body.favorited },
    create: { userId: user.sub, categorySlug, recipeSlug, favorited: body.favorited }
  })

  return { favorited: body.favorited }
})
