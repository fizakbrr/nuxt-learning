<script setup lang="ts">
const { categories } = useRecipes()

useHead({ title: 'Categories' })
</script>

<template>
  <div>
    <h1 class="mb-6 text-2xl font-bold">Categories</h1>
    <ul class="space-y-3">
      <li v-for="category in categories" :key="category.slug">
        <NuxtLink
          :to="`/categories/${category.slug}`"
          class="block rounded-lg border border-slate-200 bg-white p-4 hover:border-emerald-400"
        >
          <span class="font-medium">{{ category.title }}</span>
          <span class="ml-2 text-sm text-slate-500">
            {{ category.recipes.length }} recipes
          </span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
