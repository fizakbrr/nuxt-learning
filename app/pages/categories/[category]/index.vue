<script setup lang="ts">
const { data: category } = useCurrentCategory()
const { isFavorite } = useFavorites()
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
