import type { Request, Response, NextFunction, RequestHandler } from "express";
import type { ZodType } from "zod";
import { logger } from "@/logger";
import { z } from "zod";

export function validateQuery<T extends Record<string, unknown>>(
  schema: ZodType<T>,
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      const details = z.flattenError(result.error);
      logger.warn(
        { path: req.path, query: req.query, details },
        "Query validation failed",
      );

      res.status(400).json({
        error: "Bad Request",
        details,
      });

      return;
    }

    req.validatedQuery = result.data;
    next();
  };
}
