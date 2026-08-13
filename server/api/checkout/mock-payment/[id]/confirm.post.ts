// No user-session auth check here: a real payment provider's webhook is a
// server-to-server callback, not something the logged-in user's browser
// authenticates. The mockPaymentId itself is the unguessable credential
// (a random UUID only the earlier mock-payment call knew).
export default defineEventHandler(async (event) => {
  const mockPaymentId = getRouterParam(event, 'id')!

  const { count } = await prisma.purchase.updateMany({
    where: { mockPaymentId },
    data: { verified: true }
  })

  if (count === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Purchase not found' })
  }

  return { verified: true }
})
