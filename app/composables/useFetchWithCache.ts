// Nuxt removed built-in fetch caching, so this rebuilds a minimal version.
// Client-only: Nitro's Node process is shared across every visitor's requests,
// so a module-scoped cache populated during SSR would leak one visitor's
// response into another visitor's page render.
const cache = new Map<string, ReturnType<typeof useFetch>>()

export function useFetchWithCache<T>(url: string) {
  if (import.meta.client && cache.has(url)) {
    return cache.get(url) as ReturnType<typeof useFetch<T>>
  }

  const result = useFetch<T>(url, { key: url })

  if (import.meta.client) cache.set(url, result)

  return result
}
