export function currency(number = 0) {
    return new Intl.NumberFormat('de-DE', { currency: 'vnd' }).format(number);
}
