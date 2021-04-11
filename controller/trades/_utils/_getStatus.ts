function getStatus(quantity: number, avgEntry: number, avgExit: number, side: string): string {
  if (quantity < 1) {
    if (side === 'buy') {
      return avgEntry < avgExit ? 'WINNER' : 'LOOSER'
    }

    if (side === 'sell') {
      return avgEntry > avgExit ? 'WINNER' : 'LOOSER'
    }
  }

  return 'OPEN'
}

export default getStatus
