import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  if (await hasPurchased(user.sub)) {
    throw createError({ statusCode: 409, statusMessage: 'Already purchased' })
  }

  const purchase = await prisma.purchase.create({
    data: {
      userId: user.sub,
      mockPaymentId: crypto.randomUUID(),
      amount: PREMIUM_PRICE_CENTS,
      currency: 'usd'
    }
  })

  return { mockPaymentId: purchase.mockPaymentId }
})
