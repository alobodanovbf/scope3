declare namespace Express {
  interface Request {
    validatedQuery?: Record<string, unknown>;
  }
}
