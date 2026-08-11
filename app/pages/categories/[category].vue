<script setup lang="ts">
const route = useRoute()
const { getCategory } = useRecipes()

const category = computed(() => getCategory(route.params.category as string))

if (!category.value) {
  throw createError({ statusCode: 404, statusMessage: 'Category not found' })
}

useHead({ title: category.value.title })
</script>

<template>
  <div>
    <NuxtLink to="/categories" class="text-sm text-slate-500 hover:text-slate-900">
      &larr; All categories
    </NuxtLink>
    <h1 class="mb-6 mt-2 text-2xl font-bold">{{ category?.title }}</h1>
    <NuxtPage />
  </div>
</template>
