<script setup lang="ts">
const route = useRoute()
const { getChapter } = useCourse()

const chapter = computed(() => getChapter(route.params.chapter as string))

if (!chapter.value) {
  throw createError({ statusCode: 404, statusMessage: 'Chapter not found' })
}

useHead({ title: chapter.value.title })
</script>

<template>
  <div>
    <NuxtLink to="/chapters" class="text-sm text-slate-500 hover:text-slate-900">
      &larr; All chapters
    </NuxtLink>
    <h1 class="mb-6 mt-2 text-2xl font-bold">{{ chapter?.title }}</h1>
    <NuxtPage />
  </div>
</template>
