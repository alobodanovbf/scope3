import type { StatEntry } from "./stat-entry";

export interface MonthResponse {
  totalEmissions: number;
  month: string;
  domain: string;
  high: StatEntry;
  low: StatEntry;
  average: number;
}
