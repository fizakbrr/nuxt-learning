// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt', '@nuxtjs/supabase', '@pinia/nuxt'],
  supabase: {
    // ponytail: module's own redirect guard is declarative include/exclude globs;
    // only recipe detail pages need protection, so hand-write middleware instead (see app/middleware/auth.ts)
    redirect: false
  }
})
