function getReturnTotal(avgEntry: number, avgExit: number, size: number): number {
  return (avgExit - avgEntry) * size
}

export default getReturnTotal
