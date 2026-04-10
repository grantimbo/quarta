export function numberWithCommas(x) {
  const parsed = Number(x);
  const safeNumber = Number.isFinite(parsed) ? parsed : 0;
  return safeNumber.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}
