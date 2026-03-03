export interface DailyResult {
  date: string;
  value: number;
}

/**
 * Calculates total, high, low, and average emissions from daily results.
 */
export function calculateStats(results: DailyResult[]) {
  const totalEmissions = results.reduce((sum, entry) => sum + entry.value, 0);
  const sorted = [...results].sort(
    (current, next) => next.value - current.value,
  );

  const highest = sorted[0];
  const lowest = sorted[sorted.length - 1];

  if (!highest || !lowest) {
    throw new Error("Cannot calculate stats on empty results");
  }

  return {
    totalEmissions,
    high: { date: highest.date, value: highest.value },
    low: { date: lowest.date, value: lowest.value },
    average: totalEmissions / results.length,
  };
}
