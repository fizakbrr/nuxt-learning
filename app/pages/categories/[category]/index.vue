<script setup lang="ts">
const { data: category } = useCurrentCategory()
const favoritesStore = useFavoritesStore()
const user = useSupabaseUser()

const favoritedCount = computed(
  () => category.value?.recipes.filter((r) => favoritesStore.isFavorite(category.value!.slug, r.slug)).length ?? 0
)
</script>

<template>
  <div>
    <p v-if="user" class="mb-4 text-sm text-slate-500">
      {{ favoritedCount }} of {{ category?.recipes.length ?? 0 }} favorited
    </p>
    <ul class="space-y-3">
      <li v-for="recipe in category?.recipes" :key="recipe.slug">
        <ClientOnly>
          <RecipeCard
            :category-slug="category!.slug"
            :recipe="recipe"
            :favorite="favoritesStore.isFavorite(category!.slug, recipe.slug)"
          />
          <template #fallback>
            <RecipeCard :category-slug="category!.slug" :recipe="recipe" />
          </template>
        </ClientOnly>
      </li>
    </ul>
  </div>
</template>
