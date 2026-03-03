import { Router } from "express";
import { validateQuery } from "common/middleware/validate-query-params";
import { emissionsErrorInterceptor } from "../../services/emission/interceptor/emission-error-interceptor";
import { dayQuerySchema } from "./schema/day";
import { weekQuerySchema } from "./schema/week";
import { monthQuerySchema } from "./schema/month";
import type { DayQuery } from "./schema/day";
import type { WeekQuery } from "./schema/week";
import type { MonthQuery } from "./schema/month";
import EmissionService from "services/emission/emission.service";

const router = Router({ mergeParams: true, strict: true });

router.get("/day", validateQuery(dayQuerySchema), async (req, res, next) => {
  try {
    const { domain, date } = req.validatedQuery as DayQuery;
    const response = await EmissionService.getDay(domain, date);

    res.json(response);
  } catch (err) {
    next(err);
  }
});

router.get("/week", validateQuery(weekQuerySchema), async (req, res, next) => {
  try {
    const { domain, date } = req.validatedQuery as WeekQuery;
    const response = await EmissionService.getWeek(domain, date);

    res.json(response);
  } catch (err) {
    next(err);
  }
});

router.get(
  "/month",
  validateQuery(monthQuerySchema),
  async (req, res, next) => {
    try {
      const { domain, date } = req.validatedQuery as MonthQuery;
      const response = await EmissionService.getMonth(domain, date);

      res.json(response);
    } catch (err) {
      next(err);
    }
  },
);

router.use(emissionsErrorInterceptor);

export default router;
