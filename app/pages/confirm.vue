<script setup lang="ts">
const route = useRoute()
const user = useSupabaseUser()

watch(
  user,
  () => {
    if (user.value) navigateTo((route.query.redirect as string) || '/')
  },
  { immediate: true }
)

useHead({ title: 'Signing in' })
</script>

<template>
  <div class="mx-auto max-w-sm text-center text-slate-600">
    Signing you in...
  </div>
</template>
