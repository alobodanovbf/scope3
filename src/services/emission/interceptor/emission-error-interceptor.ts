import type { Request, Response, NextFunction } from "express";
import { FutureDateError } from "services/emission/emission.service";
import { logger } from "@/logger";

export function emissionsErrorInterceptor(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof FutureDateError) {
    res
      .status(422)
      .json({ error: "Unprocessable Entity", message: err.message });
    return;
  }

  logger.error({ err, path: req.path }, "Emissions router error");
  res.status(500).json({ error: "Internal Server Error" });
}
