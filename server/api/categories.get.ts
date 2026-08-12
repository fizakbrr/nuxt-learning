export default defineEventHandler(async (): Promise<CategoryMeta[]> => {
  const categories = await prisma.category.findMany({
    orderBy: { slug: 'asc' },
    include: { _count: { select: { recipes: true } } }
  })

  return categories.map((category) => ({
    slug: category.slug,
    title: category.title,
    recipeCount: category._count.recipes
  }))
})
