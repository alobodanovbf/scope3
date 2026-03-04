import type { DayResponse } from "@/services/emission/types/day";
import type { MonthResponse } from "@/services/emission/types/month";
import type { WeekResponse } from "@/services/emission/types/week";

interface CachedData {
    ttl: number;
    data: DayResponse | WeekResponse | MonthResponse;
}

export const emissions: Map<string, CachedData> = new Map();

class EmissionsCache {
    private ttl = 60 * 5000;

    set(domain: string, date: string, type: 'week' | 'month', data: any, ttl?: number) {
        emissions.set(`${domain}:${date}:${type}`, {
            ttl: Date.now() + (ttl || this.ttl),
            data
        });
    }

    get(domain: string, date: string, type: 'week' | 'month') {
        const data = emissions.get(`${domain}:${date}:${type}`);

        if (data && data.ttl <= Date.now()) {
            emissions.delete(`${domain}:${date}:${type}`);

            return null;
        }

        return data?.data;
    }
}

export default new EmissionsCache();
