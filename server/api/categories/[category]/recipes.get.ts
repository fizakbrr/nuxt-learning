export default defineEventHandler(async (event): Promise<CategoryWithRecipes> => {
  const categorySlug = getRouterParam(event, 'category')!

  const category = await prisma.category.findUnique({
    where: { slug: categorySlug },
    include: {
      recipes: {
        select: { slug: true, title: true, cookTime: true, description: true },
        orderBy: { slug: 'asc' }
      }
    }
  })

  if (!category) {
    throw createError({ statusCode: 404, statusMessage: 'Category not found' })
  }

  return category
})
