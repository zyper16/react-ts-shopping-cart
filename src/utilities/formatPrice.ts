const PRICE_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "USD",
  style: "currency",
});

export default function formatPrice(price: number) {
  return PRICE_FORMATTER.format(price);
}
