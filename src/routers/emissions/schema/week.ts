import { z } from "zod";
import { domainSchema } from "../../../common/schema/domain";

const weekDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "must be in YYYY-MM-DD format")
  .refine(
    (val) => !isNaN(new Date(val).getTime()),
    "must be a valid calendar date",
  );

export const weekQuerySchema = z
  .object({ domain: domainSchema, date: weekDateSchema })
  .strict();

export type WeekQuery = z.infer<typeof weekQuerySchema>;
