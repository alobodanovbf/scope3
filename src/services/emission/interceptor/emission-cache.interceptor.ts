import type { RequestHandler } from "express";
import EmissionsCache from "@/services/emission/emission-cache";

export function cacheInterceptor(type: "week" | "month"): RequestHandler {
  return (req, res, next) => {
    const { domain, date } = req.validatedQuery as { domain: string; date: string };
    const cached = EmissionsCache.get(domain, date, type);

    if (cached) {
      res.json(cached);

      return;
    }

    next();
  };
}
