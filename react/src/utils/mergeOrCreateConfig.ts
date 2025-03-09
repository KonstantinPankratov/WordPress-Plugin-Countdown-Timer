import { z } from "zod";
import { CountdownConfigSchema } from "../types/schemas/config.s";

const mergeOrCreateConfig = (configToMerge: Partial<z.infer<typeof CountdownConfigSchema>> = {}) => {
  return CountdownConfigSchema.parse(configToMerge);
};

export { mergeOrCreateConfig }