<script setup lang="ts">
const route = useRoute()
const { getLesson } = useCourse()
const { isComplete, toggleComplete } = useProgress()

const chapterSlug = computed(() => route.params.chapter as string)
const lessonSlug = computed(() => route.params.lesson as string)
const lesson = computed(() => getLesson(chapterSlug.value, lessonSlug.value))

if (!lesson.value) {
  throw createError({ statusCode: 404, statusMessage: 'Lesson not found' })
}

useHead({ title: () => lesson.value?.title ?? 'Lesson' })
</script>

<template>
  <div v-if="lesson" class="space-y-4">
    <VideoPlayer :video-id="lesson.videoId" />
    <h2 class="text-xl font-semibold">{{ lesson.title }}</h2>
    <p class="text-slate-600">{{ lesson.description }}</p>
    <ClientOnly>
      <button
        class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        @click="toggleComplete(lesson.slug)"
      >
        {{ isComplete(lesson.slug) ? 'Mark incomplete' : 'Mark complete' }}
      </button>
    </ClientOnly>
  </div>
</template>
