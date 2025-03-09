import { ReactNode } from "react";
import { z } from "zod";
import { SeparatorSchema, FontSchema } from "./schemas/fonts.s";
import { BlockConfigSchema } from "./schemas/blocks.s";
import { CountdownConfig } from "./schemas/config.s";

export interface ICDTValue {
  font: z.infer<typeof FontSchema>,
  children: ReactNode
}

export interface ICDTBlock {
  size: number,
  style: z.infer<typeof BlockConfigSchema>,
  children: ReactNode
}

export interface ICDTDelimiter {
  delimiter: z.infer<typeof SeparatorSchema>
}

declare global {
  interface Window {
    theCountdownTimerData: {
      config: Partial<CountdownConfig>;
      wpTimezoneName: string;
      wpTimezoneOffset: string;
    };
  }
}