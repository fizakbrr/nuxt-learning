<script setup lang="ts">
useHead({ title: 'Home Cookbook' })
</script>

<template>
  <div class="prose max-w-none">
    <h1>Home Cookbook</h1>
    <p>A small recipe collection, organized by category.</p>
    <NuxtLink to="/categories" class="text-emerald-600 no-underline hover:underline">
      Browse categories &rarr;
    </NuxtLink>
  </div>
</template>
