/**
 * Format a number to DZD (Algerian Dinar)
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-DZ', {
    style: 'currency',
    currency: 'DZD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price).replace('DZD', 'DA');
}

/**
 * Format area to square meters
 */
export function formatArea(area: number): string {
  return `${area} m²`;
}
