<script setup lang="ts">
const route = useRoute()
const { getRecipe } = useRecipes()
const { isFavorite, toggleFavorite } = useFavorites()

const categorySlug = computed(() => route.params.category as string)
const recipeSlug = computed(() => route.params.recipe as string)
const recipe = computed(() => getRecipe(categorySlug.value, recipeSlug.value))

if (!recipe.value) {
  throw createError({ statusCode: 404, statusMessage: 'Recipe not found' })
}

useHead({ title: () => recipe.value?.title ?? 'Recipe' })
</script>

<template>
  <div v-if="recipe" class="space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold">{{ recipe.title }}</h2>
      <span class="text-sm text-slate-500">{{ recipe.cookTime }}</span>
    </div>
    <p class="text-slate-600">{{ recipe.description }}</p>

    <div>
      <h3 class="mb-2 font-medium">Ingredients</h3>
      <ul class="list-disc space-y-1 pl-5 text-sm text-slate-700">
        <li v-for="ingredient in recipe.ingredients" :key="ingredient">{{ ingredient }}</li>
      </ul>
    </div>

    <div>
      <h3 class="mb-2 font-medium">Steps</h3>
      <ol class="list-decimal space-y-1 pl-5 text-sm text-slate-700">
        <li v-for="step in recipe.steps" :key="step">{{ step }}</li>
      </ol>
    </div>

    <ClientOnly>
      <button
        class="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        @click="toggleFavorite(recipe.slug)"
      >
        {{ isFavorite(recipe.slug) ? 'Remove favorite' : 'Save favorite' }}
      </button>
    </ClientOnly>
  </div>
</template>
