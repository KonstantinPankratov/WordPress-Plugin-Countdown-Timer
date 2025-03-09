import { z } from "zod";

export const ValidContinerAlignment = ["left", "center", "right"] as const;

const ContainerConfigSchema = z.object({
  gap: z.coerce.number().nonnegative().default(5),
  alignment: z.enum(ValidContinerAlignment).default("left"),
}).default({});

export { ContainerConfigSchema };