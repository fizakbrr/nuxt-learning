import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { PrismaClient } from '@prisma/client'

interface SeedRecipe {
  slug: string
  title: string
  cookTime: string
  description: string
  ingredients: string[]
  steps: string[]
}

interface SeedCategory {
  slug: string
  title: string
  recipes: SeedRecipe[]
}

const prisma = new PrismaClient()
const path = fileURLToPath(new URL('../app/data/recipes.json', import.meta.url))
const categories: SeedCategory[] = JSON.parse(readFileSync(path, 'utf-8'))

async function main() {
  for (const { recipes, ...category } of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category
    })

    for (const recipe of recipes) {
      const data = { ...recipe, categorySlug: category.slug }
      await prisma.recipe.upsert({
        where: { categorySlug_slug: { categorySlug: category.slug, slug: recipe.slug } },
        update: data,
        create: data
      })
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
