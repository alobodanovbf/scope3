import type { StatEntry } from "./stat-entry";

export interface WeekResponse {
  totalEmissions: number;
  dates: string[];
  domain: string;
  high: StatEntry;
  low: StatEntry;
  average: number;
}
