function getStatus(quantity: number, avgEntry: number, avgExit: number): string {
  if (quantity < 1) {
    return avgEntry < avgExit ? 'WINNER' : 'LOOSER'
  }

  return 'OPEN'
}

export default getStatus
