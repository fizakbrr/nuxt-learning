export async function hasPurchased(userId: string) {
  const purchase = await prisma.purchase.findFirst({
    where: { userId, verified: true }
  })
  return !!purchase
}
