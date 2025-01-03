import { useEffect, useReducer, useRef, useState } from 'react';
import {
    ComboboxControl,
    Tip,
    ColorPicker,
    FontSizePicker,
    Panel,
    PanelBody,
    PanelRow,
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
} from '@wordpress/components';
import '@wordpress/components/build-style/style.css';
import {
    timezoneListOptions,
    numbersFontSizeOptions,
    numbersFontWightOptions,
    unitsFontSizeOptions,
    unitsFontWightOptions
} from './presets/configurationOptions';
import CountdownTimerPreview from './CountdownTimerPreview';
import settingsReducer, { EAction } from './reducers/settingsReducer';
import _defaultPreset from './presets/default';
import './css/editor.css';
import IConfig from '../types/config';
import { configMerger } from '../utils/configMerger';

declare global {
    interface Window {
        theCountdownTimerData: {
            config: Partial<IConfig>;
            wpTimezoneName: string;
            wpTimezoneOffset: string;
        };
    }
}

const { config: loadedConfig, wpTimezoneName, wpTimezoneOffset } = window.theCountdownTimerData || {};

const defaultTimezone: string = wpTimezoneName ?
    wpTimezoneName :
    wpTimezoneOffset ?
        wpTimezoneOffset :
        typeof Intl !== 'undefined' ?
            Intl.DateTimeFormat().resolvedOptions().timeZone :
            'UTC+0:00';

const initialConfig: IConfig = {
    ..._defaultPreset,
    timezone: defaultTimezone,
    datetime: new Date(Date.now() + 95000000).toISOString().split('.')[0]
};

const config: IConfig = loadedConfig ? configMerger(_defaultPreset, loadedConfig) : initialConfig;

const CountdownTimerEditor = () => {
    const configInputRef = useRef<HTMLInputElement>(null);
    const [openedPanel, togglePanel] = useState<string>('');
    const [previewBg, setPreviewBg] = useState<string>('');

    const [settings, dispatch] = useReducer(settingsReducer, config);

    useEffect(() => {
        if (configInputRef.current) {
            configInputRef.current.value = JSON.stringify(settings);
        }
    }, [settings]);

    return (
        <div>
            <CountdownTimerPreview settings={settings} preview={{ bg: previewBg }} />

            <Panel header="Settings">
                <PanelBody title="Date & time, time zone"
                    className={openedPanel !== 'datetimezone' ? 'is-disabled' : undefined}
                    opened={openedPanel === 'datetimezone'}
                    onToggle={(opened) => togglePanel(opened ? 'datetimezone' : '')}>
                    <PanelRow>
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
                                    onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, key: 'datetime', value: newValue })}
                                    value={settings.datetime ?? ''} />
                            </FlexItem>
                            <FlexItem style={{ width: '300px' }}>
                                <ComboboxControl
                                    label="Time zone"
                                    __next40pxDefaultSize
                                    allowReset={false}
                                    options={timezoneListOptions}
                                    onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, key: 'timezone', value: newValue })}
                                    value={settings.timezone} />
                            </FlexItem>
                        </Flex>
                    </PanelRow>
                </PanelBody>
                <PanelBody title="Numbers"
                    className={openedPanel !== 'numbers' ? 'is-disabled' : undefined}
                    opened={openedPanel === 'numbers'}
                    onToggle={(opened) => togglePanel(opened ? 'numbers' : '')}>
                    <PanelRow>
                        <Flex direction="column" gap={6} style={{ width: '100%' }}>
                            <FlexBlock>
                                <Flex wrap={true} gap={6} align='flex-start' justify="unset">
                                    <FlexItem style={{ width: '300px' }}>
                                        <Flex direction="column" gap={6} style={{ width: '100%' }}>
                                            <FlexBlock>
                                                <ComboboxControl
                                                    label="Style"
                                                    __next40pxDefaultSize
                                                    options={numbersFontWightOptions}
                                                    allowReset={false}
                                                    onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'numbersFont', key: 'weight', value: newValue })}
                                                    value={settings.numbersFont.weight} />
                                            </FlexBlock>
                                            <FlexBlock>
                                                <FontSizePicker
                                                    fontSizes={numbersFontSizeOptions}
                                                    __next40pxDefaultSize
                                                    withReset={false}
                                                    units={['px']}
                                                    onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'numbersFont', key: 'size', value: newValue })}
                                                    value={settings.numbersFont.size} />
                                            </FlexBlock>
                                        </Flex>
                                    </FlexItem>
                                    <FlexItem style={{ width: '300px' }}>
                                        <BaseControl label="Color">
                                            <ColorPicker
                                                copyFormat='hex'
                                                enableAlpha={true}
                                                onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'numbersFont', key: 'color', value: newValue })}
                                                color={settings.numbersFont.color} />
                                        </BaseControl>
                                    </FlexItem>
                                </Flex>
                            </FlexBlock>
                            <FlexBlock>
                                <Tip>The <u>monospace</u> font is used to avoid number shifting.</Tip>
                            </FlexBlock>
                        </Flex>
                    </PanelRow>
                </PanelBody>
                <PanelBody title="Units"
                    className={openedPanel !== 'units' ? 'is-disabled' : undefined}
                    opened={openedPanel === 'units'}
                    onToggle={(opened) => togglePanel(opened ? 'units' : '')}>
                    <PanelRow>
                        <Flex direction="column" gap={6} style={{ width: '100%' }}>
                            <FlexBlock>
                                <Flex wrap={true} gap={6} align='flex-start' justify="unset">
                                    <FlexBlock style={{ width: '300px' }}>
                                        <TextControl
                                            label={
                                                <ToggleControl
                                                    __nextHasNoMarginBottom
                                                    label='Years'
                                                    checked={settings?.enabledUnits?.includes('years') ?? false}
                                                    onChange={(newValue) => dispatch({ type: EAction.UPDATE_ENABLED_UNITS, key: 'years', value: newValue })} />
                                            }
                                            __next40pxDefaultSize
                                            onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'defaultUnits', key: 'years', value: newValue })}
                                            value={settings.defaultUnits.years ?? ''} />
                                    </FlexBlock>
                                    <FlexBlock style={{ width: '300px' }}>
                                        <TextControl
                                            label={
                                                <ToggleControl
                                                    __nextHasNoMarginBottom
                                                    label='Months'
                                                    checked={settings?.enabledUnits?.includes('months') ?? false}
                                                    onChange={(newValue) => dispatch({ type: EAction.UPDATE_ENABLED_UNITS, key: 'months', value: newValue })} />
                                            }
                                            __next40pxDefaultSize
                                            onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'defaultUnits', key: 'months', value: newValue })}
                                            value={settings.defaultUnits.months ?? ''} />
                                    </FlexBlock>
                                    <FlexBlock style={{ width: '300px' }}>
                                        <TextControl
                                            label={
                                                <ToggleControl
                                                    __nextHasNoMarginBottom
                                                    label='Weeks'
                                                    checked={settings?.enabledUnits?.includes('weeks') ?? false}
                                                    onChange={(newValue) => dispatch({ type: EAction.UPDATE_ENABLED_UNITS, key: 'weeks', value: newValue })} />
                                            }
                                            __next40pxDefaultSize
                                            onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'defaultUnits', key: 'weeks', value: newValue })}
                                            value={settings.defaultUnits.weeks ?? ''} />
                                    </FlexBlock>
                                    <FlexBlock style={{ width: '300px' }}>
                                        <TextControl
                                            label={
                                                <ToggleControl
                                                    __nextHasNoMarginBottom
                                                    label='Days'
                                                    checked={settings?.enabledUnits?.includes('days') ?? false}
                                                    onChange={(newValue) => dispatch({ type: EAction.UPDATE_ENABLED_UNITS, key: 'days', value: newValue })} />
                                            }
                                            __next40pxDefaultSize
                                            onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'defaultUnits', key: 'days', value: newValue })}
                                            value={settings.defaultUnits.days ?? ''} />
                                    </FlexBlock>
                                    <FlexBlock style={{ width: '300px' }}>
                                        <TextControl
                                            label={
                                                <ToggleControl
                                                    __nextHasNoMarginBottom
                                                    label='Hours'
                                                    checked={settings?.enabledUnits?.includes('hours') ?? false}
                                                    onChange={(newValue) => dispatch({ type: EAction.UPDATE_ENABLED_UNITS, key: 'hours', value: newValue })} />
                                            }
                                            __next40pxDefaultSize
                                            onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'defaultUnits', key: 'hours', value: newValue })}
                                            value={settings.defaultUnits.hours ?? ''} />
                                    </FlexBlock>
                                    <FlexBlock style={{ width: '300px' }}>
                                        <TextControl
                                            label={
                                                <ToggleControl
                                                    __nextHasNoMarginBottom
                                                    label='Minutes'
                                                    checked={settings?.enabledUnits?.includes('minutes') ?? false}
                                                    onChange={(newValue) => dispatch({ type: EAction.UPDATE_ENABLED_UNITS, key: 'minutes', value: newValue })} />
                                            }
                                            __next40pxDefaultSize
                                            onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'defaultUnits', key: 'minutes', value: newValue })}
                                            value={settings.defaultUnits.minutes ?? ''} />
                                    </FlexBlock>
                                    <FlexBlock style={{ width: '300px' }}>
                                        <TextControl
                                            label={
                                                <ToggleControl
                                                    __nextHasNoMarginBottom
                                                    label='Seconds'
                                                    checked={settings?.enabledUnits?.includes('seconds') ?? false}
                                                    onChange={(newValue) => dispatch({ type: EAction.UPDATE_ENABLED_UNITS, key: 'seconds', value: newValue })} />
                                            }
                                            __next40pxDefaultSize
                                            onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'defaultUnits', key: 'seconds', value: newValue })}
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
                                                    onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'unitsFont', key: 'weight', value: newValue })}
                                                    value={settings.unitsFont.weight} />
                                            </FlexBlock>
                                            <FlexBlock>
                                                <FontSizePicker
                                                    fontSizes={unitsFontSizeOptions}
                                                    __next40pxDefaultSize
                                                    withReset={false}
                                                    units={['px']}
                                                    onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'unitsFont', key: 'size', value: newValue })}
                                                    value={settings.unitsFont.size} />
                                            </FlexBlock>
                                        </Flex>
                                    </FlexItem>
                                    <FlexItem style={{ width: '300px' }}>
                                        <BaseControl label="Color">
                                            <ColorPicker
                                                copyFormat='hex'
                                                enableAlpha={true}
                                                onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'unitsFont', key: 'color', value: newValue })}
                                                color={settings.unitsFont.color} />
                                        </BaseControl>
                                    </FlexItem>
                                </Flex>
                            </FlexBlock>
                        </Flex>
                    </PanelRow>
                </PanelBody>
                <PanelBody title="Separators"
                    className={openedPanel !== 'separators' ? 'is-disabled' : undefined}
                    opened={openedPanel === 'separators'}
                    onToggle={(opened) => togglePanel(opened ? 'separators' : '')}>
                    <PanelRow>
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
                                                    onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'timeSeparator', key: 'symbol', value: newValue })}
                                                    value={settings.timeSeparator.symbol} />
                                            </FlexBlock>
                                            <FlexBlock>
                                                <ComboboxControl
                                                    label="Style"
                                                    __next40pxDefaultSize
                                                    allowReset={false}
                                                    options={numbersFontWightOptions}
                                                    onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'timeSeparator', key: 'weight', value: newValue })}
                                                    value={settings.timeSeparator.weight} />
                                            </FlexBlock>
                                            <FlexBlock>
                                                <FontSizePicker
                                                    fontSizes={numbersFontSizeOptions}
                                                    __next40pxDefaultSize
                                                    withReset={false}
                                                    units={['px']}
                                                    onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'timeSeparator', key: 'size', value: newValue })}
                                                    value={settings.timeSeparator.size} />
                                            </FlexBlock>
                                        </Flex>
                                    </FlexItem>
                                    <FlexItem>
                                        <BaseControl label="Time separator color">
                                            <ColorPicker
                                                copyFormat='hex'
                                                onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'timeSeparator', key: 'color', value: newValue })}
                                                color={settings.timeSeparator.color} />
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
                                                    onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'daySeparator', key: 'symbol', value: newValue })}
                                                    value={settings.daySeparator.symbol} />
                                            </FlexBlock>
                                            <FlexBlock>
                                                <ComboboxControl
                                                    label="Style"
                                                    __next40pxDefaultSize
                                                    allowReset={false}
                                                    options={numbersFontWightOptions}
                                                    onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'daySeparator', key: 'weight', value: newValue })}
                                                    value={settings.daySeparator.weight} />
                                            </FlexBlock>
                                            <FlexBlock>
                                                <FontSizePicker
                                                    fontSizes={numbersFontSizeOptions}
                                                    __next40pxDefaultSize
                                                    withReset={false}
                                                    units={['px']}
                                                    onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'daySeparator', key: 'size', value: newValue })}
                                                    value={settings.daySeparator.size} />
                                            </FlexBlock>
                                        </Flex>
                                    </FlexItem>
                                    <FlexItem>
                                        <BaseControl label="Day separator color">
                                            <ColorPicker
                                                copyFormat='hex'
                                                enableAlpha={true}
                                                onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'daySeparator', key: 'color', value: newValue })}
                                                color={settings.daySeparator.color} />
                                        </BaseControl>
                                    </FlexItem>
                                </Flex>
                            </FlexItem>
                        </Flex>
                    </PanelRow>
                </PanelBody>
                <PanelBody title="Blocks"
                    className={openedPanel !== 'blocks' ? 'is-disabled' : undefined}
                    opened={openedPanel === 'blocks'}
                    onToggle={(opened) => togglePanel(opened ? 'blocks' : '')}>
                    <PanelRow>
                        <Flex direction="column" gap={6} style={{ width: '100%' }}>
                            <FlexBlock>
                                <Flex wrap={true} gap={6} align='flex-start' justify="unset">
                                    <FlexItem>
                                        <BaseControl label="Background color">
                                            <ColorPicker
                                                copyFormat='hex'
                                                enableAlpha={true}
                                                onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'blocks', key: 'background', value: newValue })}
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
                                                    onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'blocks', key: 'rounding', value: newValue })}
                                                    value={settings.blocks.rounding} />
                                            </FlexBlock>
                                            <FlexBlock>
                                                <BorderControl
                                                    shouldSanitizeBorder
                                                    label="Border"
                                                    disableUnits={true}
                                                    placeholder="Width"
                                                    onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'blocks', key: 'border', value: newValue })}
                                                    value={settings.blocks.border} />
                                            </FlexBlock>
                                            <FlexBlock>
                                                <BorderControl
                                                    label="Shadow"
                                                    enableStyle={false}
                                                    disableUnits={true}
                                                    placeholder="Blur size"
                                                    onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'blocks', key: 'shadow', value: newValue })}
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
                                                    onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'container', key: 'gap', value: newValue })}
                                                    value={settings.container.gap} />
                                            </FlexBlock>
                                            <FlexBlock>
                                                <NumberControl
                                                    __next40pxDefaultSize
                                                    label="Spacing within blocks"
                                                    min={0}
                                                    spinControls="custom"
                                                    required={true}
                                                    onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'blocks', key: 'padding', value: newValue })}
                                                    value={settings.blocks.padding} />
                                            </FlexBlock>
                                        </Flex>
                                    </FlexItem>
                                    <FlexItem style={{ width: '300px' }}>
                                        <Flex direction="column" gap={6} style={{ width: '100%' }}>
                                            <FlexBlock>
                                                <ToggleGroupControl
                                                    isBlock
                                                    label="Alignment"
                                                    onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'container', key: 'alignment', value: newValue })}
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
                                                    isBlock
                                                    label="Distribution"
                                                    onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'blocks', key: 'grow', value: newValue })}
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
                                                    help={<>
                                                        Some older versions of browsers do not support this property. You can check the current level of support by clicking <a target='_blank' rel='noreferrer' href='https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio#browser_compatibility'>here</a>
                                                    </>}
                                                    isBlock
                                                    label="Aspect ratio"
                                                    onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'blocks', key: 'aspectRatio', value: newValue })}
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
                    </PanelRow>
                </PanelBody>
                <PanelBody title="After expiration"
                    className={openedPanel !== 'expiration' ? 'is-disabled' : undefined}
                    opened={openedPanel === 'expiration'}
                    onToggle={(opened) => togglePanel(opened ? 'expiration' : '')}>
                    <PanelRow>
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
                                    onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'expiration', key: 'visibility', value: newValue })}
                                    selected={settings.expiration.visibility} />
                            </FlexBlock>
                            {settings.expiration.visibility === 'text' && <FlexBlock>
                                <TextareaControl
                                    label="Text"
                                    onChange={(newValue) => dispatch({ type: EAction.UPDATE_SETTING, group: 'expiration', key: 'text', value: newValue })}
                                    value={settings.expiration.text} />
                            </FlexBlock>}
                        </Flex>
                    </PanelRow>
                </PanelBody>
                <PanelBody title="Preview"
                    className={openedPanel !== 'preview' ? 'is-disabled' : undefined}
                    opened={openedPanel === 'preview'}
                    onToggle={(opened) => togglePanel(opened ? 'preview' : '')}>
                    <PanelRow>
                        <Flex direction="column" gap={6} style={{ width: '100%' }}>
                            <FlexBlock>
                                <BaseControl label="Background color">
                                    <ColorPicker
                                        copyFormat='hex'
                                        onChange={(newValue) => setPreviewBg(newValue)}
                                        color={previewBg} />
                                </BaseControl>
                            </FlexBlock>
                            <FlexBlock>
                                <Tip>This section is designed for preview settings and will be displayed in the <u>editor only</u>. For example, feel free to set the same background color for the preview as the section where the countdown timer will be embedded.</Tip>
                            </FlexBlock>
                        </Flex>
                    </PanelRow>
                </PanelBody>
                <PanelBody title="Animations coming soon" buttonProps={{ disabled: true }} opened={false}></PanelBody>
            </Panel>

            <input type="hidden" name="content" ref={configInputRef} />
        </div>
    );
};

export default CountdownTimerEditor;