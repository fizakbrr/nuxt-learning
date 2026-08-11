<script setup lang="ts">
const route = useRoute()
const { getChapter } = useCourse()
const { isComplete } = useProgress()

const chapter = computed(() => getChapter(route.params.chapter as string))
</script>

<template>
  <ul class="space-y-3">
    <li v-for="lesson in chapter?.lessons" :key="lesson.slug">
      <NuxtLink
        :to="`/chapters/${chapter?.slug}/${lesson.slug}`"
        class="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 hover:border-indigo-400"
      >
        <span>{{ lesson.title }}</span>
        <ClientOnly>
          <span v-if="isComplete(lesson.slug)" class="text-sm text-emerald-600">Done</span>
        </ClientOnly>
      </NuxtLink>
    </li>
  </ul>
</template>
