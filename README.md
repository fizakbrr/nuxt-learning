# Home Cookbook

A small recipe app, built to apply what I learned from Vue Mastery's [Nuxt 3: The Big Picture](https://www.vuemastery.com/courses/nuxt3-the-big-picture/) course. Scaffolded with the latest Nuxt (v4) and Vue (3.5+).

Browse recipes by category, view ingredients/steps for each one, and save favorites (persisted in localStorage).

## Concepts from the course, applied here

- **File-based routing**: `app/pages/index.vue`, `app/pages/categories/index.vue`
- **Nested routes**: `app/pages/categories/[category].vue` (parent, renders `<NuxtPage />`) + `app/pages/categories/[category]/index.vue` (child)
- **Dynamic routes**: `app/pages/categories/[category].vue`, `app/pages/categories/[category]/[recipe].vue`
- **Loading local data**: `app/data/recipes.json` read through `app/composables/useRecipes.ts`
- **Components**: `app/components/RecipeCard.vue`
- **NuxtLink + active-class**: sidebar nav and recipe cards in `app/app.vue`, `app/components/RecipeCard.vue`
- **useHead**: reactive page titles in every page under `app/pages/`
- **useState / VueUse**: `app/composables/useFavorites.ts` uses VueUse's `useLocalStorage` to persist favorited recipes across reloads, wrapped in `<ClientOnly>` where rendered
- **Universal rendering**: the app SSRs by default; `ClientOnly` is used only where localStorage state can't be known on the server

## Develop

```bash
npm install
npm run dev
```

## Deploy to Netlify

Nitro (Nuxt's server engine) zero-config-detects Netlify at build time — no `netlify.toml` needed. Push this repo to GitHub, connect it on [netlify.com](https://www.netlify.com/), and use:

- Build command: `npm run build`
- Netlify auto-detects the Nuxt output; no publish directory override needed
