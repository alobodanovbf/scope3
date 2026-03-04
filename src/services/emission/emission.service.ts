import MeasureAPI from "services/measure/api";
import { logger } from "@/logger";
import { calculateStats } from "@/lib/calculate-stats";
import { getDateRange, isFutureDate } from "@/lib/date-utils";
import EmissionsCache from "@/services/emission/emission-cache";

export class FutureDateError extends Error {
  constructor(message = "Date must be in the past") {
    super(message);
    this.name = "FutureDateError";
  }
}

export class EmissionService {
  async getDay(domain: string, date: string) {
    if (isFutureDate(date)) {
      throw new FutureDateError();
    }

    logger.info({ domain, date }, "Fetching day emissions");

    const response = await MeasureAPI.measure([domain], date);

    return { totalEmissions: response.totalEmissions, domain, date };
  }

  async getWeek(domain: string, startDate: string) {
    const dates = getDateRange(startDate, 7);

    if (dates.some(isFutureDate)) {
      throw new FutureDateError("All dates in the week must be in the past");
    }

    logger.info({ domain, startDate }, "Fetching week emissions");

    const results = await this.fetchEmissionsForDates(domain, dates);

    EmissionsCache.set(domain, startDate, 'week', calculateStats(results));

    return { ...calculateStats(results), dates, domain };
  }

  async getMonth(domain: string, month: string) {
    const [yearStr, monStr] = month.split("-");
    const daysInMonth = new Date(Number(yearStr), Number(monStr), 0).getDate();
    const dates = getDateRange(`${month}-01`, daysInMonth);

    if (dates.some(isFutureDate)) {
      throw new FutureDateError("Month must not contain future dates");
    }

    logger.info({ domain, month, daysInMonth }, "Fetching month emissions");

    const results = await this.fetchEmissionsForDates(domain, dates);

    EmissionsCache.set(domain, month, 'month', calculateStats(results));

    return { ...calculateStats(results), month, domain };
  }

  private async fetchEmissionsForDates(domain: string, dates: string[]) {
    return Promise.all(
      dates.map(async (date) => {
        const response = await MeasureAPI.measure([domain], date);

        return { date, value: response.totalEmissions };
      }),
    );
  }
}

export default new EmissionService();
