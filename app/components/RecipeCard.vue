<script setup lang="ts">
defineProps<{
  categorySlug: string
  recipe: {
    slug: string
    title: string
    cookTime: string
    description: string
  }
  favorite?: boolean
}>()
</script>

<template>
  <NuxtLink
    :to="`/categories/${categorySlug}/${recipe.slug}`"
    class="block rounded-lg border border-slate-200 bg-white p-4 hover:border-emerald-400"
  >
    <div class="flex items-center justify-between gap-2">
      <span class="font-medium">{{ recipe.title }}</span>
      <span class="flex shrink-0 items-center gap-2 text-sm text-slate-500">
        <span v-if="favorite" class="text-emerald-600">★ saved</span>
        {{ recipe.cookTime }}
      </span>
    </div>
    <p class="mt-1 text-sm text-slate-600">{{ recipe.description }}</p>
  </NuxtLink>
</template>
