<script setup lang="ts">
const emit = defineEmits<{ close: []; purchased: [] }>()

type Status = 'idle' | 'processing' | 'error'
const status = ref<Status>('idle')
const errorMessage = ref('')

const payButton = ref<HTMLButtonElement>()
onMounted(() => payButton.value?.focus())

const pay = async () => {
  status.value = 'processing'
  errorMessage.value = ''

  try {
    const { mockPaymentId } = await $fetch<{ mockPaymentId: string }>('/api/checkout/mock-payment', {
      method: 'POST'
    })

    // Simulated processor latency before the "webhook" confirms the payment.
    await new Promise((resolve) => setTimeout(resolve, 1200))

    await $fetch(`/api/checkout/mock-payment/${mockPaymentId}/confirm`, { method: 'POST' })
    emit('purchased')
  } catch {
    status.value = 'error'
    errorMessage.value = "Payment didn't go through. Try again."
  }
}

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
}
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4"
    role="dialog"
    aria-modal="true"
    aria-labelledby="checkout-title"
    @keydown="onKeydown"
    @click.self="emit('close')"
  >
    <div class="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
      <div class="flex items-start justify-between">
        <h2 id="checkout-title" class="text-lg font-semibold">Chef's Secrets</h2>
        <button
          class="text-slate-400 hover:text-slate-600"
          aria-label="Close"
          :disabled="status === 'processing'"
          @click="emit('close')"
        >
          &times;
        </button>
      </div>

      <p class="mt-1 text-sm text-slate-500">This is a mock checkout, no real payment is made.</p>

      <div class="mt-6 flex items-center justify-between border-y border-slate-200 py-4">
        <span class="text-sm text-slate-600">Lifetime access</span>
        <span class="text-lg font-semibold">{{ PREMIUM_PRICE_DISPLAY }}</span>
      </div>

      <p v-if="status === 'error'" class="mt-4 text-sm text-red-600">
        {{ errorMessage }}
      </p>

      <button
        ref="payButton"
        class="mt-6 w-full rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        :disabled="status === 'processing'"
        @click="pay"
      >
        {{ status === 'processing' ? 'Processing...' : `Pay ${PREMIUM_PRICE_DISPLAY}` }}
      </button>
    </div>
  </div>
</template>
