function formatPrice(value?: string | null) {
  const text = String(value ?? "").trim();
  if (!/^\d+$/.test(text) && !/^\d{1,3}(?:[.,\s]\d{3})+$/.test(text)) return text;
  const number = Number(text.replace(/[.,\s]/g, ""));
  return Number.isSafeInteger(number) ? `${new Intl.NumberFormat("vi-VN").format(number)}₫` : text;
}

export function Price({ price, promotionPrice }: { price: string; promotionPrice?: string | null }) {
  return (
    <span className="price">
      {promotionPrice ? (
        <>
          <del>{formatPrice(price)}</del>
          <strong>{formatPrice(promotionPrice)}</strong>
        </>
      ) : (
        <strong>{formatPrice(price)}</strong>
      )}
    </span>
  );
}
