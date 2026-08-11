<script setup lang="ts">
const route = useRoute()
const { getCategory } = useRecipes()
const { isFavorite } = useFavorites()

const category = computed(() => getCategory(route.params.category as string))
</script>

<template>
  <ul class="space-y-3">
    <li v-for="recipe in category?.recipes" :key="recipe.slug">
      <ClientOnly>
        <RecipeCard :category-slug="category!.slug" :recipe="recipe" :favorite="isFavorite(recipe.slug)" />
        <template #fallback>
          <RecipeCard :category-slug="category!.slug" :recipe="recipe" />
        </template>
      </ClientOnly>
    </li>
  </ul>
</template>
