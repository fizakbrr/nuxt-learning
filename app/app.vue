<script setup lang="ts">
const { chapters } = useCourse()
</script>

<template>
  <div class="flex min-h-screen bg-slate-50 text-slate-900">
    <aside class="w-72 shrink-0 border-r border-slate-200 bg-white">
      <div class="p-4">
        <NuxtLink to="/" class="font-semibold" active-class="text-indigo-600">
          Nuxt Course
        </NuxtLink>
      </div>
      <nav class="space-y-4 px-4 pb-6">
        <div v-for="chapter in chapters" :key="chapter.slug">
          <NuxtLink
            :to="`/chapters/${chapter.slug}`"
            class="block text-sm font-medium text-slate-700 hover:text-indigo-600"
            active-class="!text-indigo-600"
          >
            {{ chapter.title }}
          </NuxtLink>
          <ul class="mt-1 space-y-1 border-l border-slate-200 pl-3">
            <li v-for="lesson in chapter.lessons" :key="lesson.slug">
              <NuxtLink
                :to="`/chapters/${chapter.slug}/${lesson.slug}`"
                class="block truncate py-0.5 text-sm text-slate-500 hover:text-indigo-600"
                active-class="!text-indigo-600 font-medium"
              >
                {{ lesson.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <a
          href="https://www.vuemastery.com/courses/nuxt3-the-big-picture/"
          target="_blank"
          rel="noopener"
          class="block pt-2 text-sm text-slate-400 hover:text-slate-900"
        >
          Vue Mastery ↗
        </a>
      </nav>
    </aside>
    <main class="flex-1 px-8 py-8">
      <div class="mx-auto max-w-3xl">
        <NuxtPage />
      </div>
    </main>
  </div>
</template>
