import { z } from "zod";

const validFontWeight = ["200", "400", "500", "700", "900"] as const;

const FontSchema = z.object({
  family: z.string().default("monospace"),
  size: z.number().positive().default(60),
  weight: z.enum(validFontWeight).default("700"),
  color: z.string().default("#000000"),
});

const SeparatorSchema = z.object({
  symbol: z.string().default(""),
  size: z.number().positive().default(60),
  weight: z.enum(validFontWeight).default("700"),
  color: z.string().default("#000000")
});

const FontsConfigSchema = z.object({
  numbers: FontSchema.default({}),
  units: FontSchema.default({
    size: 13,
    weight: "700",
    family: "monospace",
    color: "#000000"
  }),
}).default({});

const SeparatorsConfigSchema = z.object({
  day: SeparatorSchema.default({}),
  time: SeparatorSchema.default({
    symbol: ":",
    size: 60,
    weight: "700",
    color: "#000000"
  }),
}).default({});

export { FontsConfigSchema, FontSchema, validFontWeight, SeparatorsConfigSchema, SeparatorSchema };