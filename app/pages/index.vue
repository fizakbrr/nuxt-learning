<script setup lang="ts">
useHead({ title: 'Home Cookbook' })

const user = useSupabaseUser()
const purchased = ref(false)
const showCheckout = ref(false)

// Client-only: the display that reads `purchased` is already behind
// <ClientOnly> below, so there's nothing to gain from fetching during SSR.
if (import.meta.client) {
  watch(
    user,
    async () => {
      if (!user.value) {
        purchased.value = false
        return
      }
      const status = await $fetch<{ purchased: boolean }>('/api/purchase/status')
      purchased.value = status.purchased
    },
    { immediate: true }
  )
}

const onPurchased = () => {
  purchased.value = true
  showCheckout.value = false
}
</script>

<template>
  <div>
    <div class="rounded-lg border border-slate-200 bg-white p-8">
      <h1 class="text-3xl font-bold">Home Cookbook</h1>
      <p class="mt-2 max-w-prose text-slate-600">
        A small recipe collection, organized by category. Browse the free recipes, or unlock
        Chef's Secrets for a set of premium, restaurant-style dishes.
      </p>
      <NuxtLink to="/categories" class="mt-4 inline-block text-emerald-600 hover:underline">
        Browse free categories &rarr;
      </NuxtLink>
    </div>

    <div class="mt-6 rounded-lg border border-slate-200 bg-white p-8">
      <h2 class="text-xl font-semibold">Chef's Secrets</h2>
      <p class="mt-2 max-w-prose text-slate-600">
        Two premium recipes: brown butter sage gnocchi and a miso caramel tart. One-time
        purchase, lifetime access.
      </p>
      <p class="mt-4 text-2xl font-semibold">{{ PREMIUM_PRICE_DISPLAY }}</p>

      <ClientOnly>
        <NuxtLink
          v-if="purchased"
          to="/categories/chefs-secrets"
          class="mt-4 inline-block rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          Go to Chef's Secrets &rarr;
        </NuxtLink>
        <button
          v-else-if="user"
          class="mt-4 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          @click="showCheckout = true"
        >
          Buy Now
        </button>
        <NuxtLink
          v-else
          to="/login?redirect=/"
          class="mt-4 inline-block text-sm text-slate-500 hover:text-slate-900"
        >
          Login to purchase &rarr;
        </NuxtLink>
      </ClientOnly>
    </div>

    <LazyCheckoutModal v-if="showCheckout" @close="showCheckout = false" @purchased="onPurchased" />
  </div>
</template>
