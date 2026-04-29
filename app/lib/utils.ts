import { SITE } from "./constants";

/**
 * Mendapatkan tanggal saat ini berdasarkan zona waktu yang dikonfigurasi di SITE.timezone
 */
export function getLocalizedDate(): Date {
  const now = new Date();
  const localizedString = now.toLocaleString("en-US", {
    timeZone: SITE.timezone,
  });
  return new Date(localizedString);
}

/**
 * Memformat tanggal ke format string lokal yang konsisten
 */
export function formatToWIB(date: Date = new Date()): string {
  return (
    date.toLocaleString("id-ID", {
      timeZone: SITE.timezone,
      dateStyle: "long",
      timeStyle: "short",
    }) + " WIB"
  );
}
