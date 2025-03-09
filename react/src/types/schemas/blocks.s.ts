import { z } from "zod";

const BorderConfigSchema = z.object({
  width: z.coerce.number().nonnegative(),
  color: z.string(),
  style: z.string(),
});

const ShadowConfigSchema = z.object({
  width: z.number().nonnegative(),
  color: z.string(),
});

const BlockConfigSchema = z.object({
  background: z.string().default("transparent"),
  rounding: z.number().default(0),
  border: BorderConfigSchema.default({
    width: 0,
    color: "",
    style: "none"
  }),
  shadow: ShadowConfigSchema.default({
    width: 0,
    color: ""
  }),
  padding: z.number().default(0),
  grow: z.string().default("0"),
  aspectRatio: z.string().default("auto"),
}).default({});

export { BorderConfigSchema, ShadowConfigSchema, BlockConfigSchema };