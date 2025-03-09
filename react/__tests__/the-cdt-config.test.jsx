import { describe, expect, it } from "vitest";
import { CountdownConfigSchema } from "./../src/types/schemas/config.s";
import { mergeOrCreateConfig } from "../src/utils/mergeOrCreateConfig";

describe('The CDT: CONFIG', () => {
  it('Default config generates correctly', async () => {
    const defaultConfig = mergeOrCreateConfig();
    const validatedConfig = CountdownConfigSchema.parse(defaultConfig);
    expect(validatedConfig).toEqual(defaultConfig);
  });

  it('Configs merge correctly', async () => {
    const initialConfig = {
      timezone: "PST",
      fonts: {
        numbers: {
          size: 80,
        }
      },
    };

    const mergedConfig = mergeOrCreateConfig(initialConfig);

    expect(mergedConfig.timezone).toBe("PST");
    expect(mergedConfig.fonts.numbers.size).toBe(80);
    expect(mergedConfig.fonts.units.size).toBe(13);
  });
});
