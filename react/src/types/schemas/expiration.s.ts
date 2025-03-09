import { z } from "zod";

export const ValidExpirationVisibility = ["keep", "text", "hide"] as const;

const ExpirationConfigSchema = z.object({
  visibility: z.enum(ValidExpirationVisibility).default("keep"),
  text: z.string().default(""),
}).default({});

export { ExpirationConfigSchema };