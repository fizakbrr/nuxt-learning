<script setup lang="ts">
defineProps<{
  steps: string[]
}>()
</script>

<template>
  <div>
    <h3 class="mb-2 font-medium">Steps</h3>
    <ol class="list-decimal space-y-1 pl-5 text-sm text-slate-700">
      <li v-for="step in steps" :key="step">{{ step }}</li>
    </ol>
  </div>
</template>
