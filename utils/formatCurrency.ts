function formatCurrency(number: number): string {
  return new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD' }).format(number)
}

export default formatCurrency
