import { z } from "zod";
import { FontsConfigSchema, SeparatorsConfigSchema, validFontWeight } from "../../types/schemas/fonts.s";
import { CountdownConfig } from "../../types/schemas/config.s";
import { updateSetting } from "../../store/configSlice";
import { AppDispatch } from "../../store";
import { ValidUnits } from "../../types/schemas/units.s";
import { ValidContinerAlignment } from "../../types/schemas/container.s";
import { Border } from "@wordpress/components/build-types/border-control/types";
import { ValidExpirationVisibility } from "../../types/schemas/expiration.s";

type FontsConfig = z.infer<typeof FontsConfigSchema>;
type SeparatorConfig = z.infer<typeof SeparatorsConfigSchema>;

// TODO Make Currying

export const updateConfigDatetime = (
  dispatch: AppDispatch,
  newDatetime: string
) => {
  if (!newDatetime) return;
  dispatch(updateSetting({ key: "datetime", value: newDatetime }));
};

export const updateConfigTimezone = (
  dispatch: AppDispatch,
  newTimezone: string | null | undefined
) => {
  if (!newTimezone) return;
  dispatch(updateSetting({ key: "timezone", value: newTimezone }));
};

export const updateConfigDefaultUnits = (
  dispatch: AppDispatch,
  settings: CountdownConfig,
  unit: ValidUnits,
  newValue: string | undefined | null
) => {
  if (!newValue) return;
  dispatch(updateSetting({ key: "defaultUnits", value: { ...settings.defaultUnits, [unit]: newValue } }));
};

export const updateConfigEnabledUnits = (
  dispatch: AppDispatch,
  settings: CountdownConfig,
  unit: string,
  isUnitEnabled: boolean
) => {
  const sortedUnits = (units: ValidUnits[]): ValidUnits[] => {
      const order = <ValidUnits[]>['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'];
      return order.filter((unit) => units.includes(unit));
  }

  if (isUnitEnabled) {
    dispatch(updateSetting({ key: "enabledUnits", value: sortedUnits(<ValidUnits[]>[...settings.enabledUnits, unit]) }));
  } else {
    dispatch(updateSetting({ key: "enabledUnits", value: sortedUnits(settings.enabledUnits.filter((u) => u !== unit)) }));
  }
};

export const updateConfigFontFamily = (
  dispatch: AppDispatch,
  settings: CountdownConfig,
  type: keyof FontsConfig,
  newFamily: string | null | undefined
) => {
  if (!newFamily) return;

  const newFonts: FontsConfig = {
    ...settings.fonts,
    [type]: {
      ...settings.fonts[type],
      family: newFamily,
    },
  };

  dispatch(updateSetting({ key: 'fonts', value: newFonts }));
};

export const updateConfigFontSize = (
  dispatch: AppDispatch,
  settings: CountdownConfig,
  type: keyof FontsConfig,
  newSize: string | number | undefined
) => {
  if (!newSize) return;

  const newFonts: FontsConfig = {
    ...settings.fonts,
    [type]: {
      ...settings.fonts[type],
      size: newSize as number,
    },
  };

  dispatch(updateSetting({ key: "fonts", value: newFonts }));
};

export const updateConfigFontWeight = (
  dispatch: AppDispatch,
  settings: CountdownConfig,
  type: keyof FontsConfig,
  newWeight: string | null | undefined
) => {
  if (!validFontWeight.includes(newWeight as any)) {
    return;
  }

  const newFonts: FontsConfig = {
    ...settings.fonts,
    [type]: {
      ...settings.fonts[type],
      weight: newWeight as (typeof validFontWeight)[number],
    },
  };

  dispatch(updateSetting({ key: "fonts", value: newFonts }));
};

export const updateConfigFontColor = (
  dispatch: AppDispatch,
  settings: CountdownConfig,
  type: keyof FontsConfig,
  newColor: string | null | undefined
) => {
  if (!newColor) return;

  const newFonts: FontsConfig = {
    ...settings.fonts,
    [type]: {
      ...settings.fonts[type],
      color: newColor,
    },
  };

  dispatch(updateSetting({ key: "fonts", value: newFonts }));
};

export const updateConfigSeparatorSymbol = (
  dispatch: AppDispatch,
  settings: CountdownConfig,
  type: keyof SeparatorConfig,
  newSymbol: string | null | undefined
) => {
  if (!newSymbol) return;

  const newSeparators: SeparatorConfig = {
    ...settings.separators,
    [type]: {
      ...settings.separators[type],
      symbol: newSymbol,
    },
  };

  dispatch(updateSetting({ key: "separators", value: newSeparators }));
};

export const updateConfigSeparatorSize = (
  dispatch: AppDispatch,
  settings: CountdownConfig,
  type: keyof SeparatorConfig,
  newSize: string | number | undefined
) => {
  if (!newSize) return;

  const newSeparators: SeparatorConfig = {
    ...settings.separators,
    [type]: {
      ...settings.separators[type],
      size: newSize as number,
    },
  };

  dispatch(updateSetting({ key: "separators", value: newSeparators }));
};

export const updateConfigSeparatorWeight = (
  dispatch: AppDispatch,
  settings: CountdownConfig,
  type: keyof SeparatorConfig,
  newWeight: string | null | undefined
) => {
  if (!validFontWeight.includes(newWeight as any)) {
    return;
  }

  const newSeparators: SeparatorConfig = {
    ...settings.separators,
    [type]: {
      ...settings.separators[type],
      weight: newWeight as (typeof validFontWeight)[number],
    },
  };

  dispatch(updateSetting({ key: "separators", value: newSeparators }));
};

export const updateConfigSeparatorColor = (
  dispatch: AppDispatch,
  settings: CountdownConfig,
  type: keyof SeparatorConfig,
  newColor: string | null | undefined
) => {
  if (!newColor) return;

  const newSeparators: SeparatorConfig = {
    ...settings.separators,
    [type]: {
      ...settings.separators[type],
      color: newColor,
    },
  };

  dispatch(updateSetting({ key: "separators", value: newSeparators }));
};

export const updateConfigContainerGap = (
  dispatch: AppDispatch,
  settings: CountdownConfig,
  newValue: string | number | undefined
) => {
  if (!newValue) return;
  dispatch(updateSetting({ key: "container", value: {...settings.container, gap: Number(newValue)} }));
};

export const updateConfigContainerAlignment = (
  dispatch: AppDispatch,
  settings: CountdownConfig,
  newValue: string | number | undefined
) => {
  if (!newValue) return;
  dispatch(updateSetting({ key: "container", value: {...settings.container, alignment: newValue as (typeof ValidContinerAlignment)[number]} }));
};

export const updateConfigBlocksBackground = (
  dispatch: AppDispatch,
  settings: CountdownConfig,
  newValue: string | null | undefined
) => {
  if (!newValue) return;
  dispatch(updateSetting({ key: "blocks", value: {...settings.blocks, background: newValue} }));
};

export const updateConfigBlocksRouding = (
  dispatch: AppDispatch,
  settings: CountdownConfig,
  newValue: string | number | undefined
) => {
  if (!newValue) return;
  dispatch(updateSetting({ key: "blocks", value: {...settings.blocks, rounding: Number(newValue)} }));
};

export const updateConfigBlocksPadding = (
  dispatch: AppDispatch,
  settings: CountdownConfig,
  newValue: string | number | undefined
) => {
  if (!newValue) return;
  dispatch(updateSetting({ key: "blocks", value: {...settings.blocks, padding: Number(newValue)} }));
};

export const updateConfigBlocksFlexGrow = (
  dispatch: AppDispatch,
  settings: CountdownConfig,
  newValue: string | number | undefined
) => {
  if (!newValue) return;
  dispatch(updateSetting({ key: "blocks", value: {...settings.blocks, grow: newValue as string} }));
};

export const updateConfigBlocksAspectRatio = (
  dispatch: AppDispatch,
  settings: CountdownConfig,
  newValue: string | number | undefined
) => {
  if (!newValue) return;
  dispatch(updateSetting({ key: "blocks", value: {...settings.blocks, aspectRatio: newValue as string} }));
};

export const updateConfigBlocksBorder = (
  dispatch: AppDispatch,
  settings: CountdownConfig,
  newValue: Border | undefined
) => {
  if (!newValue) return;
  dispatch(updateSetting({
    key: "blocks",
    value: {
      ...settings.blocks,
      border: { // TODO rework
        width: (newValue.width) ? Number(newValue.width.toString().replace('px', '')) : 0,
        color: String(newValue.color ?? ''),
        style: String(newValue.style ?? 'none'),
      }
    }
  }));
};

export const updateConfigBlocksShadow = (
  dispatch: AppDispatch,
  settings: CountdownConfig,
  newValue: Border | undefined
) => {
  if (!newValue) return;
  dispatch(updateSetting({
    key: "blocks",
    value: {
      ...settings.blocks,
      shadow: { // TODO rework
        width: (newValue.width) ? Number(newValue.width.toString().replace('px', '')) : 0,
        color: String(newValue.color ?? ''),
      }
    }
  }));
};

export const updateConfigExpirationVisibility = (
  dispatch: AppDispatch,
  settings: CountdownConfig,
  newValue: string
) => {
  if (!newValue) return;
  dispatch(updateSetting({ key: "expiration", value: {...settings.expiration, visibility: newValue as (typeof ValidExpirationVisibility)[number]} }));
};

export const updateConfigExpirationText = (
  dispatch: AppDispatch,
  settings: CountdownConfig,
  newValue: string | null | undefined
) => {
  if (!newValue) return;
  dispatch(updateSetting({ key: "expiration", value: {...settings.expiration, text: newValue} }));
};