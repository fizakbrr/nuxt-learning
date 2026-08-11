# Home Cookbook

A small recipe app, built to apply what I learned from Vue Mastery's Nuxt 3 course. Scaffolded with the latest Nuxt (v4) and Vue (3.5+).

Browse recipes by category, view ingredients/steps for each one, and save favorites (persisted in localStorage).

## Concepts from the course, applied here

### Chapter 1 — Building Our MVP

- **1-1 File Based Routing**: `app/pages/index.vue`, `app/pages/categories/index.vue`
- **1-2 Displaying Course Lessons** (here: displaying recipes): `app/pages/categories/index.vue`, `app/composables/useRecipes.ts`
- **1-3 Nested Routes**: `app/pages/categories/[category].vue` (parent, renders `<NuxtPage />`) + `app/pages/categories/[category]/index.vue` (child)
- **1-4 Dynamic Routes**: `app/pages/categories/[category].vue`, `app/pages/categories/[category]/[recipe].vue`
- **1-5 Loading in Course Data** (here: recipe data): `app/data/recipes.json` read through `app/composables/useRecipes.ts`
- **1-6 Update Lesson Styling**: Tailwind classes throughout `app/pages/**`, `app/layouts/default.vue`
- **1-7 Add VideoPlayer Component** (here: a different reusable component): `app/components/RecipeCard.vue`
- **1-8 What is Universal Rendering?**: the app SSRs by default; `ClientOnly` is used only where localStorage state can't be known on the server
- **1-9 Navigating with NuxtLink**: sidebar nav in `app/layouts/default.vue`, recipe cards in `app/components/RecipeCard.vue`
- **1-10 More with NuxtLink**: `active-class` styling on sidebar and recipe-card links
- **1-11 The useHead composable**: reactive page titles in every page under `app/pages/`
- **1-12 Tracking progress with useState** (here: tracking favorites): superseded by 1-13's `useLocalStorage`, see `app/composables/useFavorites.ts`
- **1-13 Save Course Progress with VueUse and ClientOnly** (here: save favorites): `app/composables/useFavorites.ts` uses VueUse's `useLocalStorage`, wrapped in `<ClientOnly>` where rendered
- **1-14 Deploying our MVP to Netlify**: see Deploy section below

### Chapter 2 — Architecture and Organizing Our Code

- **2-1 Smaller is Better**: recipe page split into `app/components/IngredientList.vue` / `StepList.vue` instead of one big page
- **2-2 Understanding App.vue**: `app/app.vue` is just `<NuxtLayout><NuxtPage /></NuxtLayout>`
- **2-3 Understanding Layouts**: `app/layouts/default.vue` holds the sidebar shell
- **2-4 Pages vs Layouts vs Components**: shell lives in the layout, shared lookups live in composables, repeated markup lives in components (see files above)
- **2-5 Understanding Composables in Nuxt**: `app/composables/useCurrentCategory.ts` and `useCurrentRecipe.ts` combine `useRoute()` with `useRecipes()`, alongside the data composable (`useRecipes.ts`) and the state composable (`useFavorites.ts`)

### Chapter 3 — Making Our App Robust

- **3-1 Adding in TypeScript**: `app/composables/useRecipes.ts` defines `Recipe`/`Category` types, used across every page and composable that touches recipe data
- **3-2 Handling Client-Side Errors with NuxtErrorBoundary**: `app/pages/categories/[category]/[recipe].vue` wraps the favorite button in `<NuxtErrorBoundary>` (localStorage writes can genuinely throw, e.g. Safari private mode)
- **3-3 Advanced Error Handling**: the boundary's `#error` slot shows the error message with a "Try again" button that calls `clearError()`
- **3-4 Handling Server Errors and 404s**: `app/error.vue` is the custom error page, reading `useError()`'s `error` prop and calling `clearError({ redirect: '/' })`
- **3-5 Route Validation**: `app/pages/categories/[category].vue` and `[recipe].vue` use `definePageMeta({ validate })` instead of manually throwing `createError()` in the component body

## Develop

```bash
npm install
npm run dev
```

## Deploy to Netlify

Nitro (Nuxt's server engine) zero-config-detects Netlify at build time — no `netlify.toml` needed. Push this repo to GitHub, connect it on [netlify.com](https://www.netlify.com/), and use:

- Build command: `npm run build`
- Netlify auto-detects the Nuxt output; no publish directory override needed
