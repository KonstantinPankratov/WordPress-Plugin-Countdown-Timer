import { useEffect, useRef, useState } from 'react';
import {
  ComboboxControl,
  Tip,
  ColorPicker,
  FontSizePicker,
  Flex,
  FlexBlock,
  TextControl,
  CardDivider,
  BaseControl,
  FlexItem,
  RadioControl,
  TextareaControl,
  __experimentalNumberControl as NumberControl,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
  ToggleControl,
  BorderControl,
  TabPanel,
  Card,
  CardBody,
} from '@wordpress/components';
import '@wordpress/components/build-style/style.css';
import {
  timezoneListOptions,
  numbersFontSizeOptions,
  numbersFontWightOptions,
  unitsFontWightOptions,
  unitsFontSizeOptions
} from './presets/configurationOptions';
import CountdownTimerPreview from './CountdownTimerPreview';
import './css/editor.css';
import { AppDispatch, RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { mergeConfig } from '../store/configSlice';
import { updateConfigBlocksAspectRatio, updateConfigBlocksBackground, updateConfigBlocksBorder, updateConfigBlocksFlexGrow, updateConfigBlocksPadding, updateConfigBlocksRouding, updateConfigBlocksShadow, updateConfigContainerAlignment, updateConfigContainerGap, updateConfigDatetime, updateConfigDefaultUnits, updateConfigEnabledUnits, updateConfigExpirationText, updateConfigExpirationVisibility, updateConfigFontColor, updateConfigFontSize, updateConfigFontWeight, updateConfigSeparatorColor, updateConfigSeparatorSize, updateConfigSeparatorSymbol, updateConfigSeparatorWeight, updateConfigTimezone } from './utils/editor-business-logic';
import SupportLabel from './SupportLabel';

const { config: loadedConfig, wpTimezoneName, wpTimezoneOffset } = window.theCountdownTimerData || {};

const defaultTimezone: string = wpTimezoneName ?
  wpTimezoneName :
  wpTimezoneOffset ?
    wpTimezoneOffset :
    typeof Intl !== 'undefined' ?
      Intl.DateTimeFormat().resolvedOptions().timeZone :
      'UTC+0:00';

const CountdownTimerEditor = () => {
  const configInputRef = useRef<HTMLInputElement>(null);
  const [previewBg, setPreviewBg] = useState<string>('');

  const dispatch: AppDispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.countdownConfig);

  useEffect(() => {
    dispatch(mergeConfig(loadedConfig));
  }, [loadedConfig]);

  useEffect(() => {
    dispatch(mergeConfig({timezone: defaultTimezone}));
  }, [defaultTimezone]);

  useEffect(() => {
    if (configInputRef.current) {
      configInputRef.current.value = JSON.stringify(settings);
    }
  }, [settings]);

  const DatetimeSettings = (
    <Flex wrap={true} align='flex-start' gap={6} style={{ width: '100%' }} justify="unset">
      <FlexItem style={{ width: '200px' }}>
        <TextControl
          label="Target Date & time"
          __next40pxDefaultSize
          type='datetime-local'
          step={1}
          onClick={
            (e) => {
              if ("showPicker" in HTMLInputElement.prototype) {
                (e.target as HTMLInputElement).showPicker();
              }
            }
          }
          onChange={(newValue) => 
            updateConfigDatetime(dispatch, newValue)
          }
          value={settings.datetime.replace('Z', '')} />
      </FlexItem>
      <FlexItem style={{ width: '300px' }}>
        <ComboboxControl
          label="Time zone"
          __next40pxDefaultSize
          allowReset={false}
          options={timezoneListOptions}
          onChange={(newValue) => 
            updateConfigTimezone(dispatch, newValue)
          }
          value={settings.timezone} />
      </FlexItem>
    </Flex>
  );

  const NumberSettings = (
    <Flex direction="column" gap={6} style={{ width: '100%' }}>
      <FlexBlock>
        <Flex wrap={true} gap={6} align='flex-start' justify="unset">
          <FlexItem style={{ width: '300px' }}>
            <Flex direction="column" gap={6} style={{ width: '100%' }}>
              <FlexBlock>
                <ComboboxControl
                  __next40pxDefaultSize
                  label="Style"
                  options={numbersFontWightOptions}
                  allowReset={false}
                  onChange={(newValue) => 
                    updateConfigFontWeight(dispatch, settings, 'numbers', newValue)
                  }
                  value={settings.fonts.numbers.weight} />
              </FlexBlock>
              <FlexBlock>
                <FontSizePicker
                  __next40pxDefaultSize
                  fontSizes={numbersFontSizeOptions}
                  withReset={false}
                  units={['px']}
                  onChange={(newValue) => 
                    updateConfigFontSize(dispatch, settings, 'numbers', newValue)
                  }
                  value={settings.fonts.numbers.size} />
              </FlexBlock>
            </Flex>
          </FlexItem>
          <FlexItem style={{ width: '300px' }}>
            <BaseControl label="Color">
              <ColorPicker
                copyFormat='hex'
                enableAlpha={true}
                onChange={(newValue) => 
                  updateConfigFontColor(dispatch, settings, 'numbers', newValue)
                }
                color={settings.fonts.numbers.color} />
            </BaseControl>
          </FlexItem>
        </Flex>
      </FlexBlock>
      <FlexBlock>
        <Tip>The <u>monospace</u> font is used to avoid number shifting.</Tip>
      </FlexBlock>
    </Flex>
  );

  const UnitSettings = (
    <Flex direction="column" gap={6} style={{ width: '100%' }}>
      <FlexBlock>
        <Flex wrap={true} gap={6} align='flex-start' justify="unset" direction='row'>
          <FlexBlock style={{ width: '120px' }}>
            <TextControl
              label={
                <ToggleControl
                  __nextHasNoMarginBottom
                  label='Years'
                  checked={settings?.enabledUnits?.includes('years') ?? false}
                  onChange={(newValue) => 
                    updateConfigEnabledUnits(dispatch, settings, 'years', newValue)
                  } />
              }
              __next40pxDefaultSize
              onChange={(newValue) => 
                updateConfigDefaultUnits(dispatch, settings, 'years', newValue)
              }
              value={settings.defaultUnits.years ?? ''} />
          </FlexBlock>
          <FlexBlock style={{ width: '120px' }}>
            <TextControl
              label={
                <ToggleControl
                  __nextHasNoMarginBottom
                  label='Months'
                  checked={settings?.enabledUnits?.includes('months') ?? false}
                  onChange={(newValue) =>
                    updateConfigEnabledUnits(dispatch, settings, 'months', newValue)
                  } />
              }
              __next40pxDefaultSize
              onChange={(newValue) => 
                updateConfigDefaultUnits(dispatch, settings, 'months', newValue)
              }
              value={settings.defaultUnits.months ?? ''} />
          </FlexBlock>
          <FlexBlock style={{ width: '120px' }}>
            <TextControl
              label={
                <ToggleControl
                  __nextHasNoMarginBottom
                  label='Weeks'
                  checked={settings?.enabledUnits?.includes('weeks') ?? false}
                  onChange={(newValue) => 
                    updateConfigEnabledUnits(dispatch, settings, 'weeks', newValue)
                  } />
              }
              __next40pxDefaultSize
              onChange={(newValue) => 
                updateConfigDefaultUnits(dispatch, settings, 'weeks', newValue)
              }
              value={settings.defaultUnits.weeks ?? ''} />
          </FlexBlock>
          <FlexBlock style={{ width: '120px' }}>
            <TextControl
              label={
                <ToggleControl
                  __nextHasNoMarginBottom
                  label='Days'
                  checked={settings?.enabledUnits?.includes('days') ?? false}
                  onChange={(newValue) => 
                    updateConfigEnabledUnits(dispatch, settings, 'days', newValue)
                  } />
              }
              __next40pxDefaultSize
              onChange={(newValue) => 
                updateConfigDefaultUnits(dispatch, settings, 'days', newValue)
              }
              value={settings.defaultUnits.days ?? ''} />
          </FlexBlock>
          <FlexBlock style={{ width: '120px' }}>
            <TextControl
              label={
                <ToggleControl
                  __nextHasNoMarginBottom
                  label='Hours'
                  checked={settings?.enabledUnits?.includes('hours') ?? false}
                  onChange={(newValue) => 
                    updateConfigEnabledUnits(dispatch, settings, 'hours', newValue)
                  } />
              }
              __next40pxDefaultSize
              onChange={(newValue) => 
                updateConfigDefaultUnits(dispatch, settings, 'hours', newValue)
              }
              value={settings.defaultUnits.hours ?? ''} />
          </FlexBlock>
          <FlexBlock style={{ width: '120px' }}>
            <TextControl
              label={
                <ToggleControl
                  __nextHasNoMarginBottom
                  label='Minutes'
                  checked={settings?.enabledUnits?.includes('minutes') ?? false}
                  onChange={(newValue) => 
                    updateConfigEnabledUnits(dispatch, settings, 'minutes', newValue)
                  } />
              }
              __next40pxDefaultSize
              onChange={(newValue) => 
                updateConfigDefaultUnits(dispatch, settings, 'minutes', newValue)
              }
              value={settings.defaultUnits.minutes ?? ''} />
          </FlexBlock>
          <FlexBlock style={{ width: '120px' }}>
            <TextControl
              label={
                <ToggleControl
                  __nextHasNoMarginBottom
                  label='Seconds'
                  checked={settings?.enabledUnits?.includes('seconds') ?? false}
                  onChange={(newValue) => 
                    updateConfigEnabledUnits(dispatch, settings, 'seconds', newValue)
                  } />
              }
              __next40pxDefaultSize
              onChange={(newValue) => 
                updateConfigDefaultUnits(dispatch, settings, 'seconds', newValue)
              }
              value={settings.defaultUnits.seconds ?? ''} />
          </FlexBlock>
        </Flex>
        <CardDivider margin={5} />
      </FlexBlock>
      <FlexBlock>
        <Flex wrap={true} gap={6} align='flex-start' justify="unset">
          <FlexItem style={{ width: '300px' }}>
            <Flex direction="column" gap={6} style={{ width: '100%' }}>
              <FlexBlock>
                <ComboboxControl
                  label="Style"
                  __next40pxDefaultSize
                  allowReset={false}
                  options={unitsFontWightOptions}
                  onChange={(newValue) => 
                    updateConfigFontWeight(dispatch, settings, 'units', newValue)
                  }
                  value={settings.fonts.units.weight} />
              </FlexBlock>
              <FlexBlock>
                <FontSizePicker
                  fontSizes={unitsFontSizeOptions}
                  __next40pxDefaultSize
                  withReset={false}
                  units={['px']}
                  onChange={(newValue) => 
                    updateConfigFontSize(dispatch, settings, 'units', newValue)
                  }
                  value={settings.fonts.units.size} />
              </FlexBlock>
            </Flex>
          </FlexItem>
          <FlexItem style={{ width: '300px' }}>
            <BaseControl label="Color">
              <ColorPicker
                copyFormat='hex'
                enableAlpha={true}
                onChange={(newValue) => 
                  updateConfigFontColor(dispatch, settings, 'units', newValue)
                }
                color={settings.fonts.units.color} />
            </BaseControl>
          </FlexItem>
        </Flex>
      </FlexBlock>
    </Flex>
  );

  const SeparatorSettings = (
    <Flex wrap={true} gap={20} justify="" align="flex-start">
      <FlexItem>
        <Flex wrap={true} gap={6} justify="" align="flex-start">
          <FlexItem style={{ width: '300px' }}>
            <Flex direction="column" gap={6} style={{ width: '100%' }}>
              <FlexBlock>
                <TextControl
                  label="Time separator"
                  __next40pxDefaultSize
                  help="between hours, minutes and seconds"
                  onChange={(newValue) => 
                    updateConfigSeparatorSymbol(dispatch, settings, 'time', newValue)
                  }
                  value={settings.separators.time.symbol} />
              </FlexBlock>
              <FlexBlock>
                <ComboboxControl
                  label="Style"
                  __next40pxDefaultSize
                  allowReset={false}
                  options={numbersFontWightOptions}
                  onChange={(newValue) => 
                    updateConfigSeparatorWeight(dispatch, settings, 'time', newValue)
                  }
                  value={settings.separators.time.weight} />
              </FlexBlock>
              <FlexBlock>
                <FontSizePicker
                  fontSizes={numbersFontSizeOptions}
                  __next40pxDefaultSize
                  withReset={false}
                  units={['px']}
                  onChange={(newValue) => 
                    updateConfigSeparatorSize(dispatch, settings, 'time', newValue)
                  }
                  value={settings.separators.time.size} />
              </FlexBlock>
            </Flex>
          </FlexItem>
          <FlexItem>
            <BaseControl label="Time separator color">
              <ColorPicker
                copyFormat='hex'
                onChange={(newValue) => 
                  updateConfigSeparatorColor(dispatch, settings, 'time', newValue)
                }
                color={settings.separators.time.color} />
            </BaseControl>
          </FlexItem>
        </Flex>
      </FlexItem>
      <FlexItem>
        <Flex wrap={true} gap={6} justify="" align="flex-start">
          <FlexItem style={{ width: '300px' }}>
            <Flex direction="column" gap={6} style={{ width: '100%' }}>
              <FlexBlock>
                <TextControl
                  label="Day Separator"
                  __next40pxDefaultSize
                  help="between days and time"
                  onChange={(newValue) => 
                    updateConfigSeparatorSymbol(dispatch, settings, 'day', newValue)
                  }
                  value={settings.separators.day.symbol} />
              </FlexBlock>
              <FlexBlock>
                <ComboboxControl
                  label="Style"
                  __next40pxDefaultSize
                  allowReset={false}
                  options={numbersFontWightOptions}
                  onChange={(newValue) => 
                    updateConfigSeparatorWeight(dispatch, settings, 'day', newValue)
                  }
                  value={settings.separators.day.weight} />
              </FlexBlock>
              <FlexBlock>
                <FontSizePicker
                  fontSizes={numbersFontSizeOptions}
                  __next40pxDefaultSize
                  withReset={false}
                  units={['px']}
                  onChange={(newValue) => 
                    updateConfigSeparatorSize(dispatch, settings, 'day', newValue)
                  }
                  value={settings.separators.day.size} />
              </FlexBlock>
            </Flex>
          </FlexItem>
          <FlexItem>
            <BaseControl label="Day separator color">
              <ColorPicker
                copyFormat='hex'
                enableAlpha={true}
                onChange={(newValue) => 
                  updateConfigSeparatorColor(dispatch, settings, 'day', newValue)
                }
                color={settings.separators.day.color} />
            </BaseControl>
          </FlexItem>
        </Flex>
      </FlexItem>
    </Flex>
  );

  const BlockSettings = (
    <Flex direction="column" gap={6} style={{ width: '100%' }}>
      <FlexBlock>
        <Flex wrap={true} gap={6} align='flex-start' justify="unset">
          <FlexItem>
            <BaseControl label="Background color">
              <ColorPicker
                copyFormat='hex'
                enableAlpha={true}
                onChange={(newValue) => 
                  updateConfigBlocksBackground(dispatch, settings, newValue)
                }
                color={settings.blocks.background} />
            </BaseControl>
          </FlexItem>
          <FlexItem style={{ width: '300px' }}>
            <Flex direction="column" gap={6} style={{ width: '100%' }}>
              <FlexBlock>
                <NumberControl
                  __next40pxDefaultSize
                  label="Corner rounding"
                  min={0}
                  spinControls="custom"
                  required={true}
                  onChange={(newValue) => 
                    updateConfigBlocksRouding(dispatch, settings, newValue)
                  }
                  value={settings.blocks.rounding} />
              </FlexBlock>
              <FlexBlock>
                <BorderControl
                  __next40pxDefaultSize
                  shouldSanitizeBorder
                  label="Border"
                  disableUnits={true}
                  placeholder="Width"
                  onChange={(newValue) => 
                    updateConfigBlocksBorder(dispatch, settings, newValue)
                  }
                  value={settings.blocks.border} />
              </FlexBlock>
              <FlexBlock>
                <BorderControl
                  __next40pxDefaultSize
                  label="Shadow"
                  enableStyle={false}
                  disableUnits={true}
                  placeholder="Blur size"
                  onChange={(newValue) => 
                    updateConfigBlocksShadow(dispatch, settings, newValue)
                  }
                  value={settings.blocks.shadow} />
              </FlexBlock>
            </Flex>
          </FlexItem>
          <FlexItem style={{ width: '300px' }}>
            <Flex direction="column" gap={6} style={{ width: '100%' }}>
              <FlexBlock>
                <NumberControl
                  __next40pxDefaultSize
                  label="Spacing between blocks"
                  min={0}
                  spinControls="custom"
                  required={true}
                  onChange={(newValue) => 
                    updateConfigContainerGap(dispatch, settings, newValue)
                  }
                  value={settings.container.gap} />
              </FlexBlock>
              <FlexBlock>
                <NumberControl
                  __next40pxDefaultSize
                  label="Spacing within blocks"
                  min={0}
                  spinControls="custom"
                  required={true}
                  onChange={(newValue) => 
                    updateConfigBlocksPadding(dispatch, settings, newValue)
                  }
                  value={settings.blocks.padding} />
              </FlexBlock>
            </Flex>
          </FlexItem>
          <FlexItem style={{ width: '300px' }}>
            <Flex direction="column" gap={6} style={{ width: '100%' }}>
              <FlexBlock>
                <ToggleGroupControl
                  __next40pxDefaultSize
                  isBlock
                  label="Alignment"
                  onChange={(newValue) => 
                    updateConfigContainerAlignment(dispatch, settings, newValue)
                  }
                  value={settings.container.alignment}>
                  <ToggleGroupControlOption
                    label="Left"
                    value="left" />
                  <ToggleGroupControlOption
                    label="Center"
                    value="center" />
                  <ToggleGroupControlOption
                    label="Right"
                    value="right" />
                </ToggleGroupControl>
              </FlexBlock>
              <FlexBlock>
                <ToggleGroupControl
                  __next40pxDefaultSize
                  isBlock
                  label="Distribution"
                  onChange={(newValue) => 
                    updateConfigBlocksFlexGrow(dispatch, settings, newValue)
                  }
                  value={settings.blocks.grow}>
                  <ToggleGroupControlOption
                    label="Auto"
                    value="0" />
                  <ToggleGroupControlOption
                    label="Fill container"
                    value="1" />
                </ToggleGroupControl>
              </FlexBlock>
              <FlexBlock>
                <ToggleGroupControl
                  __next40pxDefaultSize
                  help={<>
                    Some older versions of browsers do not support this property. You can check the current level of support by clicking <a target='_blank' rel='noreferrer' href='https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio#browser_compatibility'>here</a>
                  </>}
                  isBlock
                  label="Aspect ratio"
                  onChange={(newValue) => 
                    updateConfigBlocksAspectRatio(dispatch, settings, newValue)
                  }
                  value={settings.blocks.aspectRatio}>
                  <ToggleGroupControlOption
                    label="Auto"
                    value="auto" />
                  <ToggleGroupControlOption
                    label="Square"
                    value="1" />
                </ToggleGroupControl>
              </FlexBlock>
            </Flex>
          </FlexItem>
        </Flex>
      </FlexBlock>
    </Flex>
  );

  const ExpirationSettings = (
    <Flex direction="column" gap={6} style={{ width: '100%' }}>
      <FlexBlock>
        <RadioControl
          options={[
            {
              label: 'Keep visible',
              value: 'keep'
            },
            {
              label: 'Hide',
              value: 'hide'
            },
            {
              label: 'Show text',
              value: 'text'
            }
          ]}
          onChange={(newValue) => 
            updateConfigExpirationVisibility(dispatch, settings, newValue)
          }
          selected={settings.expiration.visibility} />
      </FlexBlock>
      {settings.expiration.visibility === 'text' && <FlexBlock>
        <TextareaControl
          label="Text"
          onChange={(newValue) => 
            updateConfigExpirationText(dispatch, settings, newValue)
          }
          value={settings.expiration.text} />
      </FlexBlock>}
      <FlexBlock>
        <Tip>To see it in action, set an <u>expired time</u> in the "Date & time, time zone" tab.</Tip>
      </FlexBlock>
    </Flex>
  );

  const PreviewSettings = (
    <Flex direction="column" gap={6} style={{ width: '100%' }}>
      <FlexBlock>
        <Tip>This section is designed for preview settings and will be displayed in the <u>editor only</u>. For example, feel free to set the same background color for the preview as the section where the countdown timer will be embedded.</Tip>
      </FlexBlock>
      <FlexBlock>
        <BaseControl label="Background color">
          <ColorPicker
            copyFormat='hex'
            onChange={(newValue) => setPreviewBg(newValue)}
            color={previewBg} />
        </BaseControl>
      </FlexBlock>
    </Flex>
  );

  return (
    <div>
      <CountdownTimerPreview settings={settings} preview={{ bg: previewBg }} />
      <TabPanel
        onSelect={() => {}}
        tabs={[
          {
            name: 'datetime',
            title: 'Date & time, time zone'
          },
          {
            name: 'numbers',
            title: 'Numbers'
          },
          {
            name: 'units',
            title: 'Units'
          },
          {
            name: 'separators',
            title: 'Separators'
          },
          {
            name: 'blocks',
            title: 'Blocks'
          },
          {
            name: 'expiration',
            title: 'After expiration'
          },
          {
            name: 'preview',
            title: 'Preview'
          }
        ]}
      >
        {( tab ) => (
          <Card style={{ marginTop: '10px' }}>
            <CardBody>
              {tab.name === 'datetime' && DatetimeSettings}
              {tab.name === 'numbers' && NumberSettings}
              {tab.name === 'units' && UnitSettings}
              {tab.name === 'separators' && SeparatorSettings}
              {tab.name === 'blocks' && BlockSettings}
              {tab.name === 'expiration' && ExpirationSettings}
              {tab.name === 'preview' && PreviewSettings}
            </CardBody>
          </Card>
        )}
      </TabPanel>
      <SupportLabel/>
      <input type="hidden" name="content" ref={configInputRef} />
    </div>
  );
};

export default CountdownTimerEditor;