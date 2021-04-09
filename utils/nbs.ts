function nbs(string: string): string {
  // Non breakable string
  return string.replaceAll(' ', '\u00A0')
}

export default nbs
