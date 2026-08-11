<script setup lang="ts">
defineProps<{
  ingredients: string[]
}>()
</script>

<template>
  <div>
    <h3 class="mb-2 font-medium">Ingredients</h3>
    <ul class="list-disc space-y-1 pl-5 text-sm text-slate-700">
      <li v-for="ingredient in ingredients" :key="ingredient">{{ ingredient }}</li>
    </ul>
  </div>
</template>
