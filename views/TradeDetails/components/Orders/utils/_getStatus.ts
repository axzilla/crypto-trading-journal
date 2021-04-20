function getStatus(quantityOpen: number, avgEntry: number, avgExit: number, side: string): string {
  if (quantityOpen <= 0) {
    if (side === 'Long') {
      return avgEntry < avgExit ? 'Winner' : 'Loser'
    }

    if (side === 'Short') {
      return avgEntry > avgExit ? 'Winner' : 'Loser'
    }
  }

  return 'Open'
}

export default getStatus
