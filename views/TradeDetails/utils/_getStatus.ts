function getStatus(quantity: number, avgEntry: number, avgExit: number, side: string): string {
  if (quantity < 1) {
    if (side === 'Long') {
      return avgEntry < avgExit ? 'WINNER' : 'LOOSER'
    }

    if (side === 'Short') {
      return avgEntry > avgExit ? 'WINNER' : 'LOOSER'
    }
  }

  return 'OPEN'
}

export default getStatus
