<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'premium']
})

const route = useRoute()
const categorySlug = route.params.category as string
const recipeSlug = route.params.recipe as string

const { data: recipe, error } = useCurrentRecipe()
const favoritesStore = useFavoritesStore()

// 401/402 are handled by the auth/premium middleware redirecting before this
// renders; this guard covers direct API errors (e.g. a 404 recipe slug).
if (error.value && error.value.statusCode !== 401 && error.value.statusCode !== 402) {
  throw createError({ statusCode: 404, statusMessage: 'Recipe not found', fatal: true })
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

    <IngredientList :ingredients="recipe.ingredients" />
    <StepList :steps="recipe.steps" />

    <ClientOnly>
      <NuxtErrorBoundary>
        <button
          class="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          @click="favoritesStore.toggleFavorite(categorySlug, recipeSlug)"
        >
          {{ favoritesStore.isFavorite(categorySlug, recipeSlug) ? 'Remove favorite' : 'Save favorite' }}
        </button>
        <template #error="{ error, clearError }">
          <p class="text-sm text-red-600">
            Couldn't save favorites ({{ error.message }}).
            <button class="underline" @click="clearError">Try again</button>
          </p>
        </template>
      </NuxtErrorBoundary>
    </ClientOnly>
  </div>
</template>
