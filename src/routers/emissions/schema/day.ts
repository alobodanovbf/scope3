import { z } from "zod";
import { domainSchema } from "../../../common/schema/domain";

const dayDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "must be in YYYY-MM-DD format")
  .refine(
    (val) => !isNaN(new Date(val).getTime()),
    "must be a valid calendar date",
  );

export const dayQuerySchema = z
  .object({ domain: domainSchema, date: dayDateSchema })
  .strict();

export type DayQuery = z.infer<typeof dayQuerySchema>;
