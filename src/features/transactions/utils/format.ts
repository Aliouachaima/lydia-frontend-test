export function formatDateFromSeconds(seconds: number): string {
  const d = new Date(seconds * 1000);

  return new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}
