import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event): Promise<Recipe> => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const categorySlug = getRouterParam(event, 'category')!
  const slug = getRouterParam(event, 'recipe')!

  const recipe = await prisma.recipe.findUnique({
    where: { categorySlug_slug: { categorySlug, slug } },
    select: { slug: true, title: true, cookTime: true, description: true, ingredients: true, steps: true }
  })

  if (!recipe) {
    throw createError({ statusCode: 404, statusMessage: 'Recipe not found' })
  }

  return recipe
})
