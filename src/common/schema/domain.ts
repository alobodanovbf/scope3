import { z } from "zod";

export const domainSchema = z
  .string()
  .regex(
    /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
    "must be a valid domain name: example.com",
  );
