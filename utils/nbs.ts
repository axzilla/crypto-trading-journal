function nbs(string: string): string {
  // Non breakable string
  return string.replace(' ', '\u00A0')
}

export default nbs
