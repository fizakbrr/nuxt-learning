<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <header class="border-b border-slate-200 bg-white">
      <nav class="mx-auto flex max-w-4xl items-center gap-6 px-4 py-4">
        <NuxtLink to="/" class="font-semibold" active-class="text-indigo-600">
          Nuxt Course
        </NuxtLink>
        <NuxtLink
          to="/chapters"
          class="text-sm text-slate-600 hover:text-slate-900"
          active-class="!text-indigo-600 font-medium"
        >
          Chapters
        </NuxtLink>
        <a
          href="https://www.vuemastery.com/courses/nuxt3-the-big-picture/"
          target="_blank"
          rel="noopener"
          class="ml-auto text-sm text-slate-500 hover:text-slate-900"
        >
          Vue Mastery ↗
        </a>
      </nav>
    </header>
    <main class="mx-auto max-w-4xl px-4 py-8">
      <NuxtPage />
    </main>
  </div>
</template>
