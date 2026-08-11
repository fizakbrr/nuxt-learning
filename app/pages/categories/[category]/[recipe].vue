<script setup lang="ts">
definePageMeta({
  validate: (route) => {
    const { getRecipe } = useRecipes()
    return !!getRecipe(route.params.category as string, route.params.recipe as string)
  }
})

const recipe = useCurrentRecipe()
const { isFavorite, toggleFavorite } = useFavorites()

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
          @click="toggleFavorite(recipe.slug)"
        >
          {{ isFavorite(recipe.slug) ? 'Remove favorite' : 'Save favorite' }}
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
