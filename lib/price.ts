export function formatCoursePrice(value?: string | number | null): string {
  if (value === undefined || value === null) return "";

  const text = String(value).trim();
  if (!text) return "";

  const isPlainInteger = /^\d+$/.test(text);
  const isGroupedInteger = /^\d{1,3}(?:[.,\s]\d{3})+$/.test(text);
  if (!isPlainInteger && !isGroupedInteger) return text;

  const number = Number(text.replace(/[.,\s]/g, ""));
  return Number.isSafeInteger(number)
    ? new Intl.NumberFormat("vi-VN").format(number)
    : text;
}
