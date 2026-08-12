<script setup lang="ts">
const { data: category, error } = useCurrentCategory()

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Category not found', fatal: true })
}

useHead({ title: () => category.value?.title ?? 'Category' })
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
