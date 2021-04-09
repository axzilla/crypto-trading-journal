function getReturnTotal(cost: number, returnTotal: number): number {
  return (100 / Number(cost)) * Number(returnTotal)
}

export default getReturnTotal
