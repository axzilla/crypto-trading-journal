function formatQuantity(number: number): string {
  return number.toLocaleString('en-EN', { maximumSignificantDigits: 20 })
}

export default formatQuantity
