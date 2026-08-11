<script setup lang="ts">
const props = defineProps<{
  error: { statusCode: number; statusMessage?: string }
}>()

const handleClear = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-center">
    <div>
      <p class="text-6xl font-bold text-emerald-600">{{ error.statusCode }}</p>
      <p class="mt-2 text-slate-600">
        {{ error.statusCode === 404 ? "That recipe or category doesn't exist." : (error.statusMessage || 'Something went wrong.') }}
      </p>
      <button
        class="mt-6 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        @click="handleClear"
      >
        Back to Home Cookbook
      </button>
    </div>
  </div>
</template>
