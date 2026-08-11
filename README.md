# Home Cookbook

A small recipe app, built to apply what I learned from Vue Mastery's Nuxt 3 course. Scaffolded with the latest Nuxt (v4) and Vue (3.5+).

Browse recipes by category, view ingredients/steps for each one, and save favorites (persisted in localStorage).

## Concepts from the course, applied here

### Chapter 1 Building Our MVP

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

### Chapter 2 Architecture and Organizing Our Code

- **2-1 Smaller is Better**: recipe page split into `app/components/IngredientList.vue` / `StepList.vue` instead of one big page
- **2-2 Understanding App.vue**: `app/app.vue` is just `<NuxtLayout><NuxtPage /></NuxtLayout>`
- **2-3 Understanding Layouts**: `app/layouts/default.vue` holds the sidebar shell
- **2-4 Pages vs Layouts vs Components**: shell lives in the layout, shared lookups live in composables, repeated markup lives in components (see files above)
- **2-5 Understanding Composables in Nuxt**: `app/composables/useCurrentCategory.ts` and `useCurrentRecipe.ts` combine `useRoute()` with `useRecipes()`, alongside the data composable (`useRecipes.ts`) and the state composable (`useFavorites.ts`)

### Chapter 3 Making Our App Robust

- **3-1 Adding in TypeScript**: `app/composables/useRecipes.ts` defines `Recipe`/`Category` types, used across every page and composable that touches recipe data
- **3-2 Handling Client-Side Errors with NuxtErrorBoundary**: `app/pages/categories/[category]/[recipe].vue` wraps the favorite button in `<NuxtErrorBoundary>` (localStorage writes can genuinely throw, e.g. Safari private mode)
- **3-3 Advanced Error Handling**: the boundary's `#error` slot shows the error message with a "Try again" button that calls `clearError()`
- **3-4 Handling Server Errors and 404s**: `app/error.vue` is the custom error page, reading `useError()`'s `error` prop and calling `clearError({ redirect: '/' })`
- **3-5 Route Validation**: `app/pages/categories/[category].vue` and `[recipe].vue` use `definePageMeta({ validate })` instead of manually throwing `createError()` in the component body

### Chapter 4 Route Middleware and Authentication

- **4-1 Route Middleware Basics**: `app/middleware/auth.ts` runs before entering a protected route and can redirect before the page even renders
- **4-2 Creating a Login Page**: `app/pages/login.vue`
- **4-3 Inline, Named, and Global Route Middleware**: `auth.ts` is a *named* middleware (lives in `app/middleware/`, applied per-page), not inline or global, since only one route pattern needs it
- **4-4 Setting Up Supabase**: `@nuxtjs/supabase` module registered in `nuxt.config.ts`, see Setup below for creating your own project
- **4-5 Adding Environment Variables**: `.env.example` documents `NUXT_PUBLIC_SUPABASE_URL` / `NUXT_PUBLIC_SUPABASE_KEY`; real values go in a local `.env` (gitignored, never committed)
- **4-6 Logging in with GitHub**: `app/pages/login.vue` calls `useSupabaseClient().auth.signInWithOAuth({ provider: 'github' })`
- **4-7 Logging Out**: `app/layouts/default.vue` sidebar footer, `supabase.auth.signOut()`
- **4-8 Protecting Routes with Auth**: `app/pages/categories/[category]/[recipe].vue` sets `middleware: 'auth'` in `definePageMeta`, so recipe detail pages require login while browsing categories stays public; the middleware also redirects back to the page you were trying to reach after login (`?redirect=` query param, read in `login.vue`/`confirm.vue`)
- **4-9 Understanding OAuth Basics**: no new code, covered by using Supabase's GitHub provider instead of building session/password handling ourselves

## Setup

```bash
npm install
cp .env.example .env
```

Then fill in `.env` with your own Supabase project:

1. Create a project at [supabase.com](https://supabase.com)
2. **Project Settings → Data API** for the project URL, **Project Settings → API Keys** for the publishable key
3. Create a GitHub OAuth app at [github.com/settings/developers](https://github.com/settings/developers), callback URL `https://<project-ref>.supabase.co/auth/v1/callback`
4. In Supabase: **Authentication → Providers → GitHub**, paste the GitHub app's Client ID and Client Secret

`.env` is gitignored and never committed; only `.env.example` (placeholder names, no real values) is tracked.

## Develop

```bash
npm run dev
```

## Deploy to Netlify

Nitro (Nuxt's server engine) detects Netlify automatically at build time, so no `netlify.toml` is needed. Push this repo to GitHub, connect it on [netlify.com](https://www.netlify.com/), and use:

- Build command: `npm run build`
- Netlify auto-detects the Nuxt output; no publish directory override needed
