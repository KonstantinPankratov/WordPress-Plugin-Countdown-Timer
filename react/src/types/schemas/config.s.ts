import { DateTime } from "luxon";
import { z } from "zod";
import { DefaultUnitsSchema, EnabledUnitsSchema } from "./units.s";
import { FontsConfigSchema, SeparatorsConfigSchema } from "./fonts.s";
import { ContainerConfigSchema } from "./container.s";
import { BlockConfigSchema } from "./blocks.s";
import { ExpirationConfigSchema } from "./expiration.s";

export const CountdownConfigSchema = z.object({
  datetime: z.coerce.string().regex(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/,
      "Incorrect datetime format (YYYY-MM-DDTHH:mm:ss or YYYY-MM-DDTHH:mm)"
    ).transform((val) => {
        const parts = val.split(':');
        if (parts.length === 2) {
          return val + ':00';
        }
        return val;
    }).default(DateTime.now().plus({ hours: 1 }).toString().slice(0, 19)),
  timezone: z.string().default("UTC"),
  enabledUnits: EnabledUnitsSchema,
  defaultUnits: DefaultUnitsSchema,
  fonts: FontsConfigSchema,
  separators: SeparatorsConfigSchema,
  container: ContainerConfigSchema,
  blocks: BlockConfigSchema,
  expiration: ExpirationConfigSchema,
}).default({});

// Infer TypeScript type from schema
export type CountdownConfig = z.infer<typeof CountdownConfigSchema>;