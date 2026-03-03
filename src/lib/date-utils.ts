/**
 * Returns true if the YYYY-MM-DD date is today or later (UTC)
 */
export function isFutureDate(date: string) {
  const todayUTC = new Date().toISOString().slice(0, 10);

  return date >= todayUTC;
}

/**
 * Builds an array of "count" consecutive YYYY-MM-DD strings starting at startDate (UTC)
 */
export function getDateRange(startDate: string, count: number) {
  const base = new Date(`${startDate}T00:00:00Z`);

  return Array.from({ length: count }, (_, dayOffset) => {
    const date = new Date(base);

    date.setUTCDate(date.getUTCDate() + dayOffset);

    return date.toISOString().slice(0, 10);
  });
}
