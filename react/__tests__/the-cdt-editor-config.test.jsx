import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest'
import { updateSetting } from '../src/store/configSlice';
import { mergeOrCreateConfig } from '../src/utils/mergeOrCreateConfig';
import { updateConfigBlocksBorder, updateConfigContainerAlignment, updateConfigContainerGap, updateConfigDatetime, updateConfigDefaultUnits, updateConfigEnabledUnits, updateConfigExpirationText, updateConfigExpirationVisibility, updateConfigFontColor, updateConfigFontFamily, updateConfigFontSize, updateConfigFontWeight, updateConfigSeparatorColor, updateConfigSeparatorSize, updateConfigSeparatorSymbol, updateConfigSeparatorWeight, updateConfigTimezone } from '../src/wordpress/utils/editor-business-logic';

describe('The CDT EDITOR CONFIG UPDATE: DATETIME & TIMEZONE', () => {
  it('Datetime update', async () => {
    const dispatch = vi.fn();

    updateConfigDatetime(dispatch, new Date().toISOString().slice(0, 16));
    updateConfigDatetime(dispatch, new Date().toISOString().slice(0, 19));
    updateConfigDatetime(dispatch, '');
    updateConfigDatetime(dispatch, null);

    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  it('Timezone update', async () => {
    const dispatch = vi.fn();

    updateConfigTimezone(dispatch, 'UTC');
    updateConfigTimezone(dispatch, 'UTC-8:00');
    updateConfigTimezone(dispatch, 'Europe/Prague');
    updateConfigTimezone(dispatch, '');
    updateConfigTimezone(dispatch, null);

    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});

describe('The CDT EDITOR CONFIG UPDATE: UNITS', () => {
  it('Enabled units update', async () => {
    const dispatch = vi.fn();
    const initialConfig = mergeOrCreateConfig();

    expect(initialConfig.enabledUnits).not.toContain('months');

    updateConfigEnabledUnits(dispatch, initialConfig, 'months', true);
    expect(dispatch).toHaveBeenCalledTimes(1);
    const updatedEnabledUnitsWithMonth = dispatch.mock.calls[0][0].payload.value;
    expect(updatedEnabledUnitsWithMonth).toContain('months');

    updateConfigEnabledUnits(dispatch, initialConfig, 'months', false);
    expect(dispatch).toHaveBeenCalledTimes(2);
    const updatedEnabledUnitsWithoutMonth = dispatch.mock.calls[1][0].payload.value;
    expect(updatedEnabledUnitsWithoutMonth).not.toContain('months');
  });

  it('Default units update', async () => {
    const dispatch = vi.fn();
    const initialConfig = mergeOrCreateConfig();

    expect(initialConfig.enabledUnits).not.toContain('months');

    updateConfigDefaultUnits(dispatch, initialConfig, 'days', 'Дни');
    expect(dispatch).toHaveBeenCalledTimes(1);
    const updatedUnits = dispatch.mock.calls[0][0].payload.value;
    expect(updatedUnits.days).toBe('Дни');
    expect(updatedUnits.minutes).toBe('Minutes');
  });
});

describe('The CDT EDITOR CONFIG UPDATE: FONTS NUMBERS', () => {
  const configKey = 'fonts';
  const configKeyTypeToTest = 'numbers';
  const configKeyTypeToTestAgainst = 'units';

  it('Family update', async () => {
    const dispatch = vi.fn();
    const initialConfig = mergeOrCreateConfig();
  
    const key = 'family';
    const newValue = 'inital';

    updateConfigFontFamily(dispatch, initialConfig, configKeyTypeToTest, '');
    updateConfigFontFamily(dispatch, initialConfig, configKeyTypeToTest, null);
    updateConfigFontFamily(dispatch, initialConfig, configKeyTypeToTest, newValue);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      updateSetting({
        key: configKey,
        value: {
          ...initialConfig[configKey],
        [configKeyTypeToTest]: {
            ...initialConfig[configKey][configKeyTypeToTest],
          [key]: newValue,
          },
        },
      })
    );

    const updatedConfigPart = dispatch.mock.calls[0][0].payload.value;

    expect(updatedConfigPart[configKeyTypeToTestAgainst]).toEqual(initialConfig[configKey][configKeyTypeToTestAgainst]);
    expect(updatedConfigPart[configKeyTypeToTest].size).toBe(initialConfig[configKey][configKeyTypeToTest].size);
    expect(updatedConfigPart[configKeyTypeToTest].weight).toBe(initialConfig[configKey][configKeyTypeToTest].weight);
    expect(updatedConfigPart[configKeyTypeToTest].color).toBe(initialConfig[configKey][configKeyTypeToTest].color);
    expect(updatedConfigPart[configKeyTypeToTest][key]).not.toBe(initialConfig[configKey][configKeyTypeToTest][key]);
  });

  it('Weight update', async () => {
    const dispatch = vi.fn();
    const initialConfig = mergeOrCreateConfig();
  
    const key = 'weight';
    const newValue = '200';

    updateConfigFontWeight(dispatch, initialConfig, configKeyTypeToTest, '');
    updateConfigFontWeight(dispatch, initialConfig, configKeyTypeToTest, null);
    updateConfigFontWeight(dispatch, initialConfig, configKeyTypeToTest, newValue);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      updateSetting({
        key: configKey,
        value: {
          ...initialConfig[configKey],
        [configKeyTypeToTest]: {
            ...initialConfig[configKey][configKeyTypeToTest],
          [key]: newValue,
          },
        },
      })
    );

    const updatedConfigPart = dispatch.mock.calls[0][0].payload.value;

    expect(updatedConfigPart[configKeyTypeToTestAgainst]).toEqual(initialConfig[configKey][configKeyTypeToTestAgainst]);
    expect(updatedConfigPart[configKeyTypeToTest].size).toBe(initialConfig[configKey][configKeyTypeToTest].size);
    expect(updatedConfigPart[configKeyTypeToTest].family).toBe(initialConfig[configKey][configKeyTypeToTest].family);
    expect(updatedConfigPart[configKeyTypeToTest].color).toBe(initialConfig[configKey][configKeyTypeToTest].color);
    expect(updatedConfigPart[configKeyTypeToTest][key]).not.toBe(initialConfig[configKey][configKeyTypeToTest][key]);
  });

  it('Size update', async () => {
    const dispatch = vi.fn();
    const initialConfig = mergeOrCreateConfig();
  
    const key = 'size';
    const newValue = 10;

    updateConfigFontSize(dispatch, initialConfig, configKeyTypeToTest, '');
    updateConfigFontSize(dispatch, initialConfig, configKeyTypeToTest, null);
    updateConfigFontSize(dispatch, initialConfig, configKeyTypeToTest, newValue);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      updateSetting({
        key: configKey,
        value: {
          ...initialConfig[configKey],
        [configKeyTypeToTest]: {
            ...initialConfig[configKey][configKeyTypeToTest],
          [key]: newValue,
          },
        },
      })
    );

    const updatedConfigPart = dispatch.mock.calls[0][0].payload.value;

    expect(updatedConfigPart[configKeyTypeToTestAgainst]).toEqual(initialConfig[configKey][configKeyTypeToTestAgainst]);
    expect(updatedConfigPart[configKeyTypeToTest].weight).toBe(initialConfig[configKey][configKeyTypeToTest].weight);
    expect(updatedConfigPart[configKeyTypeToTest].family).toBe(initialConfig[configKey][configKeyTypeToTest].family);
    expect(updatedConfigPart[configKeyTypeToTest].color).toBe(initialConfig[configKey][configKeyTypeToTest].color);
    expect(updatedConfigPart[configKeyTypeToTest][key]).not.toBe(initialConfig[configKey][configKeyTypeToTest][key]);
  });

  it('Color update', async () => {
    const dispatch = vi.fn();
    const initialConfig = mergeOrCreateConfig();
  
    const key = 'color';
    const newValue = '#FF0000';

    updateConfigFontColor(dispatch, initialConfig, configKeyTypeToTest, '');
    updateConfigFontColor(dispatch, initialConfig, configKeyTypeToTest, null);
    updateConfigFontColor(dispatch, initialConfig, configKeyTypeToTest, newValue);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      updateSetting({
        key: configKey,
        value: {
          ...initialConfig[configKey],
        [configKeyTypeToTest]: {
            ...initialConfig[configKey][configKeyTypeToTest],
          [key]: newValue,
          },
        },
      })
    );

    const updatedConfigPart = dispatch.mock.calls[0][0].payload.value;

    expect(updatedConfigPart[configKeyTypeToTestAgainst]).toEqual(initialConfig[configKey][configKeyTypeToTestAgainst]);
    expect(updatedConfigPart[configKeyTypeToTest].weight).toBe(initialConfig[configKey][configKeyTypeToTest].weight);
    expect(updatedConfigPart[configKeyTypeToTest].family).toBe(initialConfig[configKey][configKeyTypeToTest].family);
    expect(updatedConfigPart[configKeyTypeToTest].size).toBe(initialConfig[configKey][configKeyTypeToTest].size);
    expect(updatedConfigPart[configKeyTypeToTest][key]).not.toBe(initialConfig[configKey][configKeyTypeToTest][key]);
  });
});

describe('The CDT EDITOR CONFIG UPDATE: FONTS UNITS', () => {
  const configKey = 'fonts';
  const configKeyTypeToTest = 'units';
  const configKeyTypeToTestAgainst = 'numbers';

  it('Family update', async () => {
    const dispatch = vi.fn();
    const initialConfig = mergeOrCreateConfig();
  
    const key = 'family';
    const newValue = 'inital';

    updateConfigFontFamily(dispatch, initialConfig, configKeyTypeToTest, '');
    updateConfigFontFamily(dispatch, initialConfig, configKeyTypeToTest, null);
    updateConfigFontFamily(dispatch, initialConfig, configKeyTypeToTest, newValue);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      updateSetting({
        key: configKey,
        value: {
          ...initialConfig[configKey],
        [configKeyTypeToTest]: {
            ...initialConfig[configKey][configKeyTypeToTest],
          [key]: newValue,
          },
        },
      })
    );

    const updatedConfigPart = dispatch.mock.calls[0][0].payload.value;

    expect(updatedConfigPart[configKeyTypeToTestAgainst]).toEqual(initialConfig[configKey][configKeyTypeToTestAgainst]);
    expect(updatedConfigPart[configKeyTypeToTest].size).toBe(initialConfig[configKey][configKeyTypeToTest].size);
    expect(updatedConfigPart[configKeyTypeToTest].weight).toBe(initialConfig[configKey][configKeyTypeToTest].weight);
    expect(updatedConfigPart[configKeyTypeToTest].color).toBe(initialConfig[configKey][configKeyTypeToTest].color);
    expect(updatedConfigPart[configKeyTypeToTest][key]).not.toBe(initialConfig[configKey][configKeyTypeToTest][key]);
  });

  it('Weight update', async () => {
    const dispatch = vi.fn();
    const initialConfig = mergeOrCreateConfig();
  
    const key = 'weight';
    const newValue = '200';

    updateConfigFontWeight(dispatch, initialConfig, configKeyTypeToTest, '');
    updateConfigFontWeight(dispatch, initialConfig, configKeyTypeToTest, null);
    updateConfigFontWeight(dispatch, initialConfig, configKeyTypeToTest, newValue);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      updateSetting({
        key: configKey,
        value: {
          ...initialConfig[configKey],
        [configKeyTypeToTest]: {
            ...initialConfig[configKey][configKeyTypeToTest],
          [key]: newValue,
          },
        },
      })
    );

    const updatedConfigPart = dispatch.mock.calls[0][0].payload.value;

    expect(updatedConfigPart[configKeyTypeToTestAgainst]).toEqual(initialConfig[configKey][configKeyTypeToTestAgainst]);
    expect(updatedConfigPart[configKeyTypeToTest].size).toBe(initialConfig[configKey][configKeyTypeToTest].size);
    expect(updatedConfigPart[configKeyTypeToTest].family).toBe(initialConfig[configKey][configKeyTypeToTest].family);
    expect(updatedConfigPart[configKeyTypeToTest].color).toBe(initialConfig[configKey][configKeyTypeToTest].color);
    expect(updatedConfigPart[configKeyTypeToTest][key]).not.toBe(initialConfig[configKey][configKeyTypeToTest][key]);
  });

  it('Size update', async () => {
    const dispatch = vi.fn();
    const initialConfig = mergeOrCreateConfig();
  
    const key = 'size';
    const newValue = 10;

    updateConfigFontSize(dispatch, initialConfig, configKeyTypeToTest, '');
    updateConfigFontSize(dispatch, initialConfig, configKeyTypeToTest, null);
    updateConfigFontSize(dispatch, initialConfig, configKeyTypeToTest, newValue);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      updateSetting({
        key: configKey,
        value: {
          ...initialConfig[configKey],
        [configKeyTypeToTest]: {
            ...initialConfig[configKey][configKeyTypeToTest],
          [key]: newValue,
          },
        },
      })
    );

    const updatedConfigPart = dispatch.mock.calls[0][0].payload.value;

    expect(updatedConfigPart[configKeyTypeToTestAgainst]).toEqual(initialConfig[configKey][configKeyTypeToTestAgainst]);
    expect(updatedConfigPart[configKeyTypeToTest].weight).toBe(initialConfig[configKey][configKeyTypeToTest].weight);
    expect(updatedConfigPart[configKeyTypeToTest].family).toBe(initialConfig[configKey][configKeyTypeToTest].family);
    expect(updatedConfigPart[configKeyTypeToTest].color).toBe(initialConfig[configKey][configKeyTypeToTest].color);
    expect(updatedConfigPart[configKeyTypeToTest][key]).not.toBe(initialConfig[configKey][configKeyTypeToTest][key]);
  });

  it('Color update', async () => {
    const dispatch = vi.fn();
    const initialConfig = mergeOrCreateConfig();
  
    const key = 'color';
    const newValue = '#FF0000';

    updateConfigFontColor(dispatch, initialConfig, configKeyTypeToTest, '');
    updateConfigFontColor(dispatch, initialConfig, configKeyTypeToTest, null);
    updateConfigFontColor(dispatch, initialConfig, configKeyTypeToTest, newValue);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      updateSetting({
        key: configKey,
        value: {
          ...initialConfig[configKey],
        [configKeyTypeToTest]: {
            ...initialConfig[configKey][configKeyTypeToTest],
          [key]: newValue,
          },
        },
      })
    );

    const updatedConfigPart = dispatch.mock.calls[0][0].payload.value;

    expect(updatedConfigPart[configKeyTypeToTestAgainst]).toEqual(initialConfig[configKey][configKeyTypeToTestAgainst]);
    expect(updatedConfigPart[configKeyTypeToTest].weight).toBe(initialConfig[configKey][configKeyTypeToTest].weight);
    expect(updatedConfigPart[configKeyTypeToTest].family).toBe(initialConfig[configKey][configKeyTypeToTest].family);
    expect(updatedConfigPart[configKeyTypeToTest].size).toBe(initialConfig[configKey][configKeyTypeToTest].size);
    expect(updatedConfigPart[configKeyTypeToTest][key]).not.toBe(initialConfig[configKey][configKeyTypeToTest][key]);
  });
});

describe('The CDT EDITOR CONFIG UPDATE: SEPARATORS DAY', () => {
  const configKey = 'separators';
  const configKeyTypeToTest = 'day';
  const configKeyTypeToTestAgainst = 'time';

  it('Symbol update', async () => {
    const dispatch = vi.fn();
    const initialConfig = mergeOrCreateConfig();
  
    const key = 'symbol';
    const newValue = '-';

    updateConfigSeparatorSymbol(dispatch, initialConfig, configKeyTypeToTest, '');
    updateConfigSeparatorSymbol(dispatch, initialConfig, configKeyTypeToTest, null);
    updateConfigSeparatorSymbol(dispatch, initialConfig, configKeyTypeToTest, newValue);

    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch).toHaveBeenCalledWith(
      updateSetting({
        key: configKey,
        value: {
          ...initialConfig[configKey],
        [configKeyTypeToTest]: {
            ...initialConfig[configKey][configKeyTypeToTest],
          [key]: newValue,
          },
        },
      })
    );

    const updatedConfigPart = dispatch.mock.calls[0][0].payload.value;

    expect(updatedConfigPart[configKeyTypeToTestAgainst]).toEqual(initialConfig[configKey][configKeyTypeToTestAgainst]);
    expect(updatedConfigPart[configKeyTypeToTest].size).toBe(initialConfig[configKey][configKeyTypeToTest].size);
    expect(updatedConfigPart[configKeyTypeToTest].weight).toBe(initialConfig[configKey][configKeyTypeToTest].weight);
    expect(updatedConfigPart[configKeyTypeToTest].color).toBe(initialConfig[configKey][configKeyTypeToTest].color);
    expect(updatedConfigPart[configKeyTypeToTest][key]).toBe(initialConfig[configKey][configKeyTypeToTest][key]);
  });

  it('Weight update', async () => {
    const dispatch = vi.fn();
    const initialConfig = mergeOrCreateConfig();
  
    const key = 'weight';
    const newValue = '200';

    updateConfigSeparatorWeight(dispatch, initialConfig, configKeyTypeToTest, '');
    updateConfigSeparatorWeight(dispatch, initialConfig, configKeyTypeToTest, null);
    updateConfigSeparatorWeight(dispatch, initialConfig, configKeyTypeToTest, newValue);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      updateSetting({
        key: configKey,
        value: {
          ...initialConfig[configKey],
        [configKeyTypeToTest]: {
            ...initialConfig[configKey][configKeyTypeToTest],
          [key]: newValue,
          },
        },
      })
    );

    const updatedConfigPart = dispatch.mock.calls[0][0].payload.value;

    expect(updatedConfigPart[configKeyTypeToTestAgainst]).toEqual(initialConfig[configKey][configKeyTypeToTestAgainst]);
    expect(updatedConfigPart[configKeyTypeToTest].size).toBe(initialConfig[configKey][configKeyTypeToTest].size);
    expect(updatedConfigPart[configKeyTypeToTest].symbol).toBe(initialConfig[configKey][configKeyTypeToTest].symbol);
    expect(updatedConfigPart[configKeyTypeToTest].color).toBe(initialConfig[configKey][configKeyTypeToTest].color);
    expect(updatedConfigPart[configKeyTypeToTest][key]).not.toBe(initialConfig[configKey][configKeyTypeToTest][key]);
  });

  it('Size update', async () => {
    const dispatch = vi.fn();
    const initialConfig = mergeOrCreateConfig();
  
    const key = 'size';
    const newValue = 10;

    updateConfigSeparatorSize(dispatch, initialConfig, configKeyTypeToTest, '');
    updateConfigSeparatorSize(dispatch, initialConfig, configKeyTypeToTest, null);
    updateConfigSeparatorSize(dispatch, initialConfig, configKeyTypeToTest, newValue);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      updateSetting({
        key: configKey,
        value: {
          ...initialConfig[configKey],
        [configKeyTypeToTest]: {
            ...initialConfig[configKey][configKeyTypeToTest],
          [key]: newValue,
          },
        },
      })
    );

    const updatedConfigPart = dispatch.mock.calls[0][0].payload.value;

    expect(updatedConfigPart[configKeyTypeToTestAgainst]).toEqual(initialConfig[configKey][configKeyTypeToTestAgainst]);
    expect(updatedConfigPart[configKeyTypeToTest].weight).toBe(initialConfig[configKey][configKeyTypeToTest].weight);
    expect(updatedConfigPart[configKeyTypeToTest].symbol).toBe(initialConfig[configKey][configKeyTypeToTest].symbol);
    expect(updatedConfigPart[configKeyTypeToTest].color).toBe(initialConfig[configKey][configKeyTypeToTest].color);
    expect(updatedConfigPart[configKeyTypeToTest][key]).not.toBe(initialConfig[configKey][configKeyTypeToTest][key]);
  });

  it('Color update', async () => {
    const dispatch = vi.fn();
    const initialConfig = mergeOrCreateConfig();
  
    const key = 'color';
    const newValue = '#FF0000';

    updateConfigSeparatorColor(dispatch, initialConfig, configKeyTypeToTest, '');
    updateConfigSeparatorColor(dispatch, initialConfig, configKeyTypeToTest, null);
    updateConfigSeparatorColor(dispatch, initialConfig, configKeyTypeToTest, newValue);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      updateSetting({
        key: configKey,
        value: {
          ...initialConfig[configKey],
        [configKeyTypeToTest]: {
            ...initialConfig[configKey][configKeyTypeToTest],
          [key]: newValue,
          },
        },
      })
    );

    const updatedConfigPart = dispatch.mock.calls[0][0].payload.value;

    expect(updatedConfigPart[configKeyTypeToTestAgainst]).toEqual(initialConfig[configKey][configKeyTypeToTestAgainst]);
    expect(updatedConfigPart[configKeyTypeToTest].weight).toBe(initialConfig[configKey][configKeyTypeToTest].weight);
    expect(updatedConfigPart[configKeyTypeToTest].symbol).toBe(initialConfig[configKey][configKeyTypeToTest].symbol);
    expect(updatedConfigPart[configKeyTypeToTest].size).toBe(initialConfig[configKey][configKeyTypeToTest].size);
    expect(updatedConfigPart[configKeyTypeToTest][key]).not.toBe(initialConfig[configKey][configKeyTypeToTest][key]);
  });
});

describe('The CDT EDITOR CONFIG UPDATE: SEPARATORS TIME', () => {
  const configKey = 'separators';
  const configKeyTypeToTest = 'time';
  const configKeyTypeToTestAgainst = 'day';

  it('Symbol update', async () => {
    const dispatch = vi.fn();
    const initialConfig = mergeOrCreateConfig();
  
    const key = 'symbol';
    const newValue = '-';

    updateConfigSeparatorSymbol(dispatch, initialConfig, configKeyTypeToTest, '');
    updateConfigSeparatorSymbol(dispatch, initialConfig, configKeyTypeToTest, null);
    updateConfigSeparatorSymbol(dispatch, initialConfig, configKeyTypeToTest, newValue);

    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch).toHaveBeenCalledWith(
      updateSetting({
        key: configKey,
        value: {
          ...initialConfig[configKey],
        [configKeyTypeToTest]: {
            ...initialConfig[configKey][configKeyTypeToTest],
          [key]: newValue,
          },
        },
      })
    );

    const updatedConfigPart = dispatch.mock.calls[0][0].payload.value;

    expect(updatedConfigPart[configKeyTypeToTestAgainst]).toEqual(initialConfig[configKey][configKeyTypeToTestAgainst]);
    expect(updatedConfigPart[configKeyTypeToTest].size).toBe(initialConfig[configKey][configKeyTypeToTest].size);
    expect(updatedConfigPart[configKeyTypeToTest].weight).toBe(initialConfig[configKey][configKeyTypeToTest].weight);
    expect(updatedConfigPart[configKeyTypeToTest].color).toBe(initialConfig[configKey][configKeyTypeToTest].color);
    expect(updatedConfigPart[configKeyTypeToTest][key]).not.toBe(initialConfig[configKey][configKeyTypeToTest][key]);
  });

  it('Weight update', async () => {
    const dispatch = vi.fn();
    const initialConfig = mergeOrCreateConfig();
  
    const key = 'weight';
    const newValue = '200';

    updateConfigSeparatorWeight(dispatch, initialConfig, configKeyTypeToTest, '');
    updateConfigSeparatorWeight(dispatch, initialConfig, configKeyTypeToTest, null);
    updateConfigSeparatorWeight(dispatch, initialConfig, configKeyTypeToTest, newValue);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      updateSetting({
        key: configKey,
        value: {
          ...initialConfig[configKey],
        [configKeyTypeToTest]: {
            ...initialConfig[configKey][configKeyTypeToTest],
          [key]: newValue,
          },
        },
      })
    );

    const updatedConfigPart = dispatch.mock.calls[0][0].payload.value;

    expect(updatedConfigPart[configKeyTypeToTestAgainst]).toEqual(initialConfig[configKey][configKeyTypeToTestAgainst]);
    expect(updatedConfigPart[configKeyTypeToTest].size).toBe(initialConfig[configKey][configKeyTypeToTest].size);
    expect(updatedConfigPart[configKeyTypeToTest].symbol).toBe(initialConfig[configKey][configKeyTypeToTest].symbol);
    expect(updatedConfigPart[configKeyTypeToTest].color).toBe(initialConfig[configKey][configKeyTypeToTest].color);
    expect(updatedConfigPart[configKeyTypeToTest][key]).not.toBe(initialConfig[configKey][configKeyTypeToTest][key]);
  });

  it('Size update', async () => {
    const dispatch = vi.fn();
    const initialConfig = mergeOrCreateConfig();
  
    const key = 'size';
    const newValue = 10;

    updateConfigSeparatorSize(dispatch, initialConfig, configKeyTypeToTest, '');
    updateConfigSeparatorSize(dispatch, initialConfig, configKeyTypeToTest, null);
    updateConfigSeparatorSize(dispatch, initialConfig, configKeyTypeToTest, newValue);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      updateSetting({
        key: configKey,
        value: {
          ...initialConfig[configKey],
        [configKeyTypeToTest]: {
            ...initialConfig[configKey][configKeyTypeToTest],
          [key]: newValue,
          },
        },
      })
    );

    const updatedConfigPart = dispatch.mock.calls[0][0].payload.value;

    expect(updatedConfigPart[configKeyTypeToTestAgainst]).toEqual(initialConfig[configKey][configKeyTypeToTestAgainst]);
    expect(updatedConfigPart[configKeyTypeToTest].weight).toBe(initialConfig[configKey][configKeyTypeToTest].weight);
    expect(updatedConfigPart[configKeyTypeToTest].symbol).toBe(initialConfig[configKey][configKeyTypeToTest].symbol);
    expect(updatedConfigPart[configKeyTypeToTest].color).toBe(initialConfig[configKey][configKeyTypeToTest].color);
    expect(updatedConfigPart[configKeyTypeToTest][key]).not.toBe(initialConfig[configKey][configKeyTypeToTest][key]);
  });

  it('Color update', async () => {
    const dispatch = vi.fn();
    const initialConfig = mergeOrCreateConfig();
  
    const key = 'color';
    const newValue = '#FF0000';

    updateConfigSeparatorColor(dispatch, initialConfig, configKeyTypeToTest, '');
    updateConfigSeparatorColor(dispatch, initialConfig, configKeyTypeToTest, null);
    updateConfigSeparatorColor(dispatch, initialConfig, configKeyTypeToTest, newValue);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      updateSetting({
        key: configKey,
        value: {
          ...initialConfig[configKey],
        [configKeyTypeToTest]: {
            ...initialConfig[configKey][configKeyTypeToTest],
          [key]: newValue,
          },
        },
      })
    );

    const updatedConfigPart = dispatch.mock.calls[0][0].payload.value;

    expect(updatedConfigPart[configKeyTypeToTestAgainst]).toEqual(initialConfig[configKey][configKeyTypeToTestAgainst]);
    expect(updatedConfigPart[configKeyTypeToTest].weight).toBe(initialConfig[configKey][configKeyTypeToTest].weight);
    expect(updatedConfigPart[configKeyTypeToTest].symbol).toBe(initialConfig[configKey][configKeyTypeToTest].symbol);
    expect(updatedConfigPart[configKeyTypeToTest].size).toBe(initialConfig[configKey][configKeyTypeToTest].size);
    expect(updatedConfigPart[configKeyTypeToTest][key]).not.toBe(initialConfig[configKey][configKeyTypeToTest][key]);
  });
});

describe('The CDT EDITOR CONFIG UPDATE: CONTAINER', () => {
  it('Gap', async () => {
    const dispatch = vi.fn();
    const initialConfig = mergeOrCreateConfig();

    updateConfigContainerGap(dispatch, initialConfig, '30');
    expect(dispatch).toHaveBeenCalledTimes(1);
    const updatedGap30 = dispatch.mock.calls[0][0].payload.value;
    expect(updatedGap30.gap).toBe(30);

    updateConfigContainerGap(dispatch, initialConfig, 40);
    expect(dispatch).toHaveBeenCalledTimes(2);
    const updatedGap40 = dispatch.mock.calls[1][0].payload.value;
    expect(updatedGap40.gap).toBe(40);
  });

  it('Alignment', async () => {
    const dispatch = vi.fn();
    const initialConfig = mergeOrCreateConfig();

    updateConfigContainerAlignment(dispatch, initialConfig, 'center');
    expect(dispatch).toHaveBeenCalledTimes(1);
    const updatedAlignmentCenter = dispatch.mock.calls[0][0].payload.value;
    expect(updatedAlignmentCenter.alignment).toBe('center');

    updateConfigContainerAlignment(dispatch, initialConfig, 'right');
    expect(dispatch).toHaveBeenCalledTimes(2);
    const updatedAlignmentRight = dispatch.mock.calls[1][0].payload.value;
    expect(updatedAlignmentRight.alignment).toBe('right');
  });
});

describe('The CDT EDITOR CONFIG UPDATE: BLOCKS', () => {
  it('Border', async () => {
    const dispatch = vi.fn();
    const initialConfig = mergeOrCreateConfig();

    updateConfigBlocksBorder(
      dispatch,
      initialConfig,
      {
        style: 'dotted',
        color: '#FF0000',
        width: 2,
      }
    );
    expect(dispatch).toHaveBeenCalledTimes(1);
    const updatedBlocksWithProperValues = dispatch.mock.calls[0][0].payload.value;
    expect(updatedBlocksWithProperValues.border.style).toBe('dotted');
    expect(updatedBlocksWithProperValues.border.color).toBe('#FF0000');
    expect(updatedBlocksWithProperValues.border.width).toBe(2);

    updateConfigBlocksBorder(
      dispatch,
      initialConfig,
      undefined
    );
    expect(dispatch).toHaveBeenCalledTimes(1);

    updateConfigBlocksBorder(
      dispatch,
      initialConfig,
      {
        style: undefined,
        color: '',
        width: '2px',
      }
    );

    expect(dispatch).toHaveBeenCalledTimes(2);
    const updatedBlocksWithInProperValues = dispatch.mock.calls[1][0].payload.value;
    expect(updatedBlocksWithInProperValues.border.style).toBe('none');
    expect(updatedBlocksWithInProperValues.border.color).toBe('');
    expect(updatedBlocksWithInProperValues.border.width).toBe(2);
  });
});

describe('The CDT EDITOR CONFIG UPDATE: EXPIRATION', () => {
  it('Visibility', async () => {
    const dispatch = vi.fn();
    const initialConfig = mergeOrCreateConfig();

    updateConfigExpirationVisibility(
      dispatch,
      initialConfig,
      'text'
    );
    expect(dispatch).toHaveBeenCalledTimes(1);
    const updatedExpiration = dispatch.mock.calls[0][0].payload.value;
    expect(updatedExpiration.visibility).toBe('text');
  });
  
  it('Text', async () => {
    const dispatch = vi.fn();
    const initialConfig = mergeOrCreateConfig();

    updateConfigExpirationText(
      dispatch,
      initialConfig,
      'test text'
    );
    expect(dispatch).toHaveBeenCalledTimes(1);
    const updatedExpiration = dispatch.mock.calls[0][0].payload.value;
    expect(updatedExpiration.text).toBe('test text');
  });
});