import { z } from "zod";
import { domainSchema } from "../../../common/schema/domain";

const monthDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}$/, "must be in YYYY-MM format: 2025-01");

export const monthQuerySchema = z
  .object({ domain: domainSchema, date: monthDateSchema })
  .strict();

export type MonthQuery = z.infer<typeof monthQuerySchema>;
