<script setup lang="ts">
const { categories } = useRecipes()
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const logout = async () => {
  await supabase.auth.signOut()
  navigateTo('/')
}
</script>

<template>
  <div class="flex min-h-screen bg-slate-50 text-slate-900">
    <aside class="flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div class="p-4">
        <NuxtLink to="/" class="font-semibold" active-class="text-emerald-600">
          Home Cookbook
        </NuxtLink>
      </div>
      <nav class="flex-1 space-y-1 px-4 pb-6">
        <NuxtLink
          v-for="category in categories"
          :key="category.slug"
          :to="`/categories/${category.slug}`"
          class="block rounded px-2 py-1.5 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          active-class="!bg-emerald-50 !text-emerald-700 font-medium"
        >
          {{ category.title }}
        </NuxtLink>
      </nav>
      <ClientOnly>
        <div class="border-t border-slate-200 p-4">
          <NuxtLink
            v-if="!user"
            to="/login"
            class="block text-sm text-slate-600 hover:text-slate-900"
          >
            Login
          </NuxtLink>
          <button
            v-else
            class="text-sm text-slate-600 hover:text-slate-900"
            @click="logout"
          >
            Logout
          </button>
        </div>
      </ClientOnly>
    </aside>
    <main class="flex-1 px-8 py-8">
      <div class="mx-auto max-w-2xl">
        <slot />
      </div>
    </main>
  </div>
</template>
