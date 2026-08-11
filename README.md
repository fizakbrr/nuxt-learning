# Nuxt 3: The Big Picture — course app

Demo app built while following Vue Mastery's [Nuxt 3: The Big Picture](https://www.vuemastery.com/courses/nuxt3-the-big-picture/).
Scaffolded with the latest Nuxt (v4) and Vue (3.5+) instead of the course's exact Nuxt 3.x pin — the concepts carry over unchanged.

Course lesson/chapter data (`app/data/course.json`) is placeholder: titles/descriptions come from the course's lesson list, but every `videoId` is a stand-in Vimeo ID (`76979871`). Swap in the real Vimeo video IDs once you have them.

## Lesson -> code map

| Lesson | Where it lives |
|---|---|
| 1-1 File Based Routing | `app/pages/index.vue`, `app/pages/chapters/index.vue` |
| 1-2 Displaying Course Lessons | `app/pages/chapters/index.vue`, `app/data/course.json` |
| 1-3 Nested Routes | `app/pages/chapters/[chapter].vue` (parent) + `app/pages/chapters/[chapter]/index.vue` (child) |
| 1-4 Dynamic Routes | `app/pages/chapters/[chapter].vue`, `app/pages/chapters/[chapter]/[lesson].vue` |
| 1-5 Loading in Course Data | `app/data/course.json`, `app/composables/useCourse.ts` |
| 1-6 Update Lesson Styling | Tailwind classes across `app/pages/**`, `app/app.vue` |
| 1-7 Add VideoPlayer Component | `app/components/VideoPlayer.vue` |
| 1-8 What is Universal Rendering? | No new code — the whole app SSRs by default; `ClientOnly` is used only where localStorage state (lesson 1-13) requires client-only rendering |
| 1-9 Navigating with NuxtLink | `app/app.vue`, all page links |
| 1-10 More with NuxtLink | `app/app.vue` (`active-class`, external Vue Mastery link) |
| 1-11 The useHead composable | `useHead()` calls in `app/pages/index.vue`, `app/pages/chapters/[chapter].vue`, `app/pages/chapters/[chapter]/[lesson].vue` |
| 1-12 Tracking progress with useState | Superseded by 1-13's `useLocalStorage`, see `app/composables/useProgress.ts` comment |
| 1-13 Save Course Progress with VueUse and ClientOnly | `app/composables/useProgress.ts` (`useLocalStorage`), `<ClientOnly>` wrapping progress UI in `app/pages/chapters/[chapter]/index.vue` and `[lesson].vue` |
| 1-14 Deploying our MVP to Netlify | See below |

## Develop

```bash
npm install
npm run dev
```

## Deploy to Netlify

Nitro (Nuxt's server engine) zero-config-detects Netlify at build time — no `netlify.toml` needed. Push this repo to GitHub, connect it on [netlify.com](https://www.netlify.com/), and use:

- Build command: `npm run build`
- Netlify auto-detects the Nuxt output; no publish directory override needed
