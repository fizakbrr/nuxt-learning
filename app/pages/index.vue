<script setup lang="ts">
useHead({ title: 'Nuxt Course' })
</script>

<template>
  <div class="prose max-w-none">
    <h1>Nuxt 3: The Big Picture</h1>
    <p>
      Course notes and demo app built while following Vue Mastery's
      <a href="https://www.vuemastery.com/courses/nuxt3-the-big-picture/" target="_blank" rel="noopener">
        Nuxt 3: The Big Picture
      </a>.
    </p>
    <NuxtLink to="/chapters" class="text-indigo-600 no-underline hover:underline">
      Browse chapters &rarr;
    </NuxtLink>
  </div>
</template>
