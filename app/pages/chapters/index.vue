<script setup lang="ts">
const { chapters } = useCourse()

useHead({ title: 'Chapters' })
</script>

<template>
  <div>
    <h1 class="mb-6 text-2xl font-bold">Chapters</h1>
    <ul class="space-y-3">
      <li v-for="chapter in chapters" :key="chapter.slug">
        <NuxtLink
          :to="`/chapters/${chapter.slug}`"
          class="block rounded-lg border border-slate-200 bg-white p-4 hover:border-indigo-400"
        >
          <span class="font-medium">{{ chapter.title }}</span>
          <span class="ml-2 text-sm text-slate-500">
            {{ chapter.lessons.length }} lessons
          </span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
