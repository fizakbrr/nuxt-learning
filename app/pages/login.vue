<script setup lang="ts">
const route = useRoute()
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const redirectTo = computed(() => (route.query.redirect as string) || '/')

watch(
  user,
  () => {
    if (user.value) navigateTo(redirectTo.value)
  },
  { immediate: true }
)

const loginWithGithub = async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/confirm?redirect=${encodeURIComponent(redirectTo.value)}`
    }
  })
}

useHead({ title: 'Login' })
</script>

<template>
  <div class="mx-auto max-w-sm space-y-4 text-center">
    <h1 class="text-2xl font-bold">Login</h1>
    <p class="text-slate-600">Login is required to view recipe details.</p>
    <button
      class="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
      @click="loginWithGithub"
    >
      Login with GitHub
    </button>
  </div>
</template>
