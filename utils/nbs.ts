function nbs(string: string): string {
  // Non breakable string
  return string.replace(/ /g, '\u00A0')
}

export default nbs
