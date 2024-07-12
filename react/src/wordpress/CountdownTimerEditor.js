import { useEffect, useReducer, useRef, useState } from '@wordpress/element';
import '@wordpress/components/build-style/style.css';
import CountdownTimerPreview from './CountdownTimerPreview';
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
    __experimentalBorderControl as BorderControl,
    __experimentalNumberControl as NumberControl,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';

import {
    utcTimezones,
    numbersFontSizeOptions,
    numbersFontWightOptions,
    unitsFontSizeOptions,
    unitsFontWightOptions
} from './configurationOptions';
import { settingsReducer } from './reducers/settingsReducer';
import './css/editor.css';

const { config, wpTimezoneName, wpTimezoneOffset } = window.theCountdownTimerData || {};

const defaultTimezone = wpTimezoneName ? 
                            wpTimezoneName : 
                            wpTimezoneOffset ? 
                                wpTimezoneOffset : 
                                Intl.DateTimeFormat().resolvedOptions().timeZone;

const initialConfig = {
    ...require('./presets/default.json'),
    timezone: defaultTimezone,
    datetime: new Date(Date.now() + 95000000).toISOString().split('.')[0]
};

const timezoneList = Intl.supportedValuesOf('timeZone').map((tz) => {
    const tzOffset = new Intl.DateTimeFormat('en',{timeZone:tz, timeZoneName:'shortOffset'}).formatToParts().find(part => part.type==='timeZoneName').value;
    return {
        value: tz,
        label: `${tz} (${tzOffset})`,
    }
});

const CountdownTimerEditor = () => {
    const configInputRef = useRef(null);
    const [ openedPanel, togglePanel ] = useState();
    const [ previewBg, setPreviewBg ] = useState();

    const [settings, dispatch] = useReducer(settingsReducer, config ?? initialConfig);

    useEffect(() => {
        if (configInputRef.current) {
            configInputRef.current.value = JSON.stringify(settings);
        }
    }, [settings]);

    return (
        <div>
            <CountdownTimerPreview settings={settings} preview={{ bg: previewBg }}/>

            <Panel header="Settings">
                <PanelBody title="Date & time, timezone"
                    className={ openedPanel !== 'panel1' && 'is-disabled'  }
                    opened={openedPanel === 'panel1'}
                    onToggle={(opened) => togglePanel(opened ? 'panel1' : '')}>
                    <PanelRow>
                        <Flex wrap={true} align='flex-start' gap={6} style={{ width: '100%' }} justify="unset">
                            <FlexItem style={{ width: '200px' }}>
                                <TextControl
                                    label="Target Date & time"
                                    __next40pxDefaultSize
                                    type='datetime-local'
                                    step={1}
                                    onClick={(e) => e.target.showPicker()}
                                    onChange={ ( newValue ) => dispatch({ type: 'UPDATE_SETTING', key: 'datetime', value: newValue}) }
                                    value={ settings.datetime }/>
                            </FlexItem>
                            <FlexItem style={{ width: '300px' }}>
                                <ComboboxControl
                                    label="Timezone"
                                    __next40pxDefaultSize
                                    allowReset={false}
                                    options={[...timezoneList, ...utcTimezones]}
                                    onChange={ ( newValue ) => dispatch({ type: 'UPDATE_SETTING', key: 'timezone', value: newValue}) }
                                    value={ settings.timezone }/>
                            </FlexItem>
                        </Flex>
                    </PanelRow>
                </PanelBody>
                <PanelBody title="Numbers"
                    className={ openedPanel !== 'panel2' && 'is-disabled' }
                    opened={openedPanel === 'panel2'}
                    onToggle={(opened) => togglePanel(opened ? 'panel2' : '')}>
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
                                                    onChange={ ( newValue ) => dispatch({ type: 'UPDATE_SETTING', group: 'numbersFont', key: 'weight', value: newValue}) }
                                                    value={settings.numbersFont.weight}/>
                                            </FlexBlock>
                                            <FlexBlock>
                                                <FontSizePicker
                                                    fontSizes={numbersFontSizeOptions}
                                                    __next40pxDefaultSize
                                                    withReset={false}
                                                    numberss={[ 'px' ]}
                                                    onChange={ ( newValue ) => dispatch({ type: 'UPDATE_SETTING', group: 'numbersFont', key: 'size', value: newValue}) }
                                                    value={settings.numbersFont.size}/>
                                            </FlexBlock>
                                        </Flex>
                                    </FlexItem>
                                    <FlexItem style={{ width: '300px' }}>
                                        <BaseControl label="Color">
                                            <ColorPicker
                                                copyFormat='hex'
                                                enableAlpha={true}
                                                onChange={ ( newValue ) => dispatch({ type: 'UPDATE_SETTING', group: 'numbersFont', key: 'color', value: newValue}) }
                                                color={settings.numbersFont.color}/>
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
                    className={ openedPanel !== 'panel3' && 'is-disabled' }
                    opened={openedPanel === 'panel3'}
                    onToggle={(opened) => togglePanel(opened ? 'panel3' : '')}>
                    <PanelRow>
                        <Flex direction="column" gap={6} style={{ width: '100%' }}>
                            <FlexBlock>
                                <Flex wrap={true} gap={6} align='flex-start' justify="unset">
                                    <FlexBlock>
                                        <TextControl
                                            label="Days"
                                            __next40pxDefaultSize
                                            help="The text that is displayed for 'Days'"
                                            onChange={ ( newValue ) => dispatch({ type: 'UPDATE_SETTING', group: 'defaultUnits', key: 'days', value: newValue}) }
                                            value={ settings.defaultUnits.days }/>
                                    </FlexBlock>
                                    <FlexBlock>
                                        <TextControl
                                            label="Hours"
                                            __next40pxDefaultSize
                                            help="The text that is displayed for 'Hours'"
                                            onChange={ ( newValue ) => dispatch({ type: 'UPDATE_SETTING', group: 'defaultUnits', key: 'hours', value: newValue}) }
                                            value={ settings.defaultUnits.hours }/>
                                    </FlexBlock>
                                    <FlexBlock>
                                        <TextControl
                                            label="Minutes"
                                            __next40pxDefaultSize
                                            help="The text that is displayed for 'Minutes'"
                                            onChange={ ( newValue ) => dispatch({ type: 'UPDATE_SETTING', group: 'defaultUnits', key: 'minutes', value: newValue}) }
                                            value={ settings.defaultUnits.minutes }/>
                                    </FlexBlock>
                                    <FlexBlock>
                                        <TextControl
                                            label="Seconds"
                                            __next40pxDefaultSize
                                            help="The text that is displayed for 'Seconds'"
                                            onChange={ ( newValue ) => dispatch({ type: 'UPDATE_SETTING', group: 'defaultUnits', key: 'seconds', value: newValue}) }
                                            value={ settings.defaultUnits.seconds }/>
                                    </FlexBlock>
                                </Flex>
                                <CardDivider margin={5}/>
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
                                                    onChange={ ( newValue ) => dispatch({ type: 'UPDATE_SETTING', group: 'unitsFont', key: 'weight', value: newValue}) }
                                                    value={settings.unitsFont.weight}/>
                                            </FlexBlock>
                                            <FlexBlock>
                                                <FontSizePicker
                                                    fontSizes={unitsFontSizeOptions}
                                                    __next40pxDefaultSize
                                                    withReset={false}
                                                    units={[ 'px' ]}
                                                    onChange={ ( newValue ) => dispatch({ type: 'UPDATE_SETTING', group: 'unitsFont', key: 'size', value: newValue}) }
                                                    value={settings.unitsFont.size}/>
                                            </FlexBlock>
                                        </Flex>
                                    </FlexItem>
                                    <FlexItem style={{ width: '300px' }}>
                                        <BaseControl label="Color">
                                            <ColorPicker
                                                copyFormat='hex'
                                                enableAlpha={true}
                                                onChange={ ( newValue ) => dispatch({ type: 'UPDATE_SETTING', group: 'unitsFont', key: 'color', value: newValue}) }
                                                color={settings.unitsFont.color}/>
                                        </BaseControl>
                                    </FlexItem>
                                </Flex>
                            </FlexBlock>
                        </Flex>
                    </PanelRow>
                </PanelBody>
                <PanelBody title="Separators"
                    className={ openedPanel !== 'panel4' && 'is-disabled' }
                    opened={openedPanel === 'panel4'}
                    onToggle={(opened) => togglePanel(opened ? 'panel4' : '')}>
                    <PanelRow>
                        <Flex wrap={true} gap={20} justify="" align="flex-start">
                            <FlexItem>
                                <Flex wrap={true} gap={6} justify="" align="flex-start">
                                    <FlexItem width="300px">
                                        <Flex direction="column" gap={6} style={{ width: '100%' }}>
                                            <FlexBlock>
                                                <TextControl
                                                    label="Time separator"
                                                    __next40pxDefaultSize
                                                    help="between hours, minutes and seconds"
                                                    onChange={ ( newValue ) => dispatch({ type: 'UPDATE_SETTING', group: 'timeSeparator', key: 'symbol', value: newValue}) }
                                                    value={settings.timeSeparator.symbol}/>
                                            </FlexBlock>
                                            <FlexBlock>
                                                <ComboboxControl
                                                    label="Style"
                                                    __next40pxDefaultSize
                                                    allowReset={false}
                                                    options={numbersFontWightOptions}
                                                    onChange={ ( newValue ) => dispatch({ type: 'UPDATE_SETTING', group: 'timeSeparator', key: 'weight', value: newValue}) }
                                                    value={settings.timeSeparator.weight}/>
                                            </FlexBlock>
                                            <FlexBlock>
                                                <FontSizePicker
                                                    fontSizes={numbersFontSizeOptions}
                                                    __next40pxDefaultSize
                                                    withReset={false}
                                                    units={[ 'px' ]}
                                                    onChange={ ( newValue ) => dispatch({ type: 'UPDATE_SETTING', group: 'timeSeparator', key: 'size', value: newValue}) }
                                                    value={settings.timeSeparator.size}/>
                                            </FlexBlock>
                                        </Flex>
                                    </FlexItem>
                                    <FlexItem>
                                        <BaseControl label="Time separator color">
                                            <ColorPicker
                                                copyFormat='hex'
                                                onChange={ ( newValue ) => dispatch({ type: 'UPDATE_SETTING', group: 'timeSeparator', key: 'color', value: newValue}) }
                                                color={settings.timeSeparator.color}/>
                                        </BaseControl>
                                    </FlexItem>
                                </Flex>
                            </FlexItem>
                            <FlexItem>
                                <Flex wrap={true} gap={6} justify="" align="flex-start">
                                    <FlexItem width="300px">
                                        <Flex direction="column" gap={6} style={{ width: '100%' }}>
                                            <FlexBlock>
                                                <TextControl
                                                    label="Day Separator"
                                                    __next40pxDefaultSize
                                                    help="between days and time"
                                                    onChange={ ( newValue ) => dispatch({ type: 'UPDATE_SETTING', group: 'daySeparator', key: 'symbol', value: newValue}) }
                                                    value={settings.daySeparator.symbol}/>
                                            </FlexBlock>
                                            <FlexBlock>
                                                <ComboboxControl
                                                    label="Style"
                                                    __next40pxDefaultSize
                                                    allowReset={false}
                                                    options={numbersFontWightOptions}
                                                    onChange={ ( newValue ) => dispatch({ type: 'UPDATE_SETTING', group: 'daySeparator', key: 'weight', value: newValue}) }
                                                    value={settings.daySeparator.weight}/>
                                            </FlexBlock>
                                            <FlexBlock>
                                                <FontSizePicker
                                                    fontSizes={numbersFontSizeOptions}
                                                    __next40pxDefaultSize
                                                    withReset={false}
                                                    units={[ 'px' ]}
                                                    onChange={ ( newValue ) => dispatch({ type: 'UPDATE_SETTING', group: 'daySeparator', key: 'size', value: newValue}) }
                                                    value={settings.daySeparator.size}/>
                                            </FlexBlock>
                                        </Flex>
                                    </FlexItem>
                                    <FlexItem>
                                        <BaseControl label="Day separator color">
                                            <ColorPicker
                                                copyFormat='hex'
                                                enableAlpha={true}
                                                onChange={ ( newValue ) => dispatch({ type: 'UPDATE_SETTING', group: 'daySeparator', key: 'color', value: newValue}) }
                                                color={settings.daySeparator.color}/>
                                        </BaseControl>
                                    </FlexItem>
                                </Flex>
                            </FlexItem>
                        </Flex>
                    </PanelRow>
                </PanelBody>
                <PanelBody title="Blocks"
                    className={ openedPanel !== 'panel5' && 'is-disabled' }
                    opened={openedPanel === 'panel5'}
                    onToggle={(opened) => togglePanel(opened ? 'panel5' : '')}>
                    <PanelRow>
                        <Flex direction="column" gap={6} style={{ width: '100%' }}>
                            <FlexBlock>
                                <Flex wrap={true} gap={6} align='flex-start' justify="unset">
                                    <FlexItem>
                                        <BaseControl label="Background color">
                                            <ColorPicker
                                                copyFormat='hex'
                                                enableAlpha={true}
                                                onChange={ ( newValue ) => dispatch({ type: 'UPDATE_SETTING', group: 'blocks', key: 'background', value: newValue}) }
                                                color={settings.blocks.background}/>
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
                                                    onChange={ ( newValue ) => dispatch({ type: 'UPDATE_SETTING', group: 'blocks', key: 'rounding', value: newValue}) }
                                                    value={settings.blocks.rounding}/>
                                            </FlexBlock>
                                            <FlexBlock>
                                                <BorderControl
                                                    label="Border"
                                                    disableUnits={true}
                                                    onChange={ ( newValue ) => dispatch({ type: 'UPDATE_SETTING', group: 'blocks', key: 'border', value: newValue}) }
                                                    value={settings.blocks.border}/>
                                            </FlexBlock>
                                            <FlexBlock>
                                                <BorderControl
                                                    label="Shadow"
                                                    enableStyle={false}
                                                    disableUnits={true}
                                                    placeholder="Blur"
                                                    onChange={ ( newValue ) => dispatch({ type: 'UPDATE_SETTING', group: 'blocks', key: 'shadow', value: newValue}) }
                                                    value={settings.blocks.shadow}/>
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
                                                    onChange={ ( newValue ) => dispatch({ type: 'UPDATE_SETTING', group: 'container', key: 'gap', value: newValue}) }
                                                    value={settings.container.gap}/>
                                            </FlexBlock>
                                            <FlexBlock>
                                                <NumberControl
                                                    __next40pxDefaultSize
                                                    label="Spacing within blocks"
                                                    min={0}
                                                    spinControls="custom"
                                                    required={true}
                                                    onChange={ ( newValue ) => dispatch({ type: 'UPDATE_SETTING', group: 'blocks', key: 'padding', value: newValue}) }
                                                    value={settings.blocks.padding}/>
                                            </FlexBlock>
                                        </Flex>
                                    </FlexItem>
                                    <FlexItem style={{ width: '300px' }}>
                                        <Flex direction="column" gap={6} style={{ width: '100%' }}>
                                            <FlexBlock>
                                                <ToggleGroupControl
                                                    isBlock
                                                    label="Alignment"
                                                    onChange={ ( newValue ) => dispatch({ type: 'UPDATE_SETTING', group: 'container', key: 'alignment', value: newValue}) }
                                                    value={settings.container.alignment}>
                                                    <ToggleGroupControlOption
                                                        label="Left"
                                                        value="left"/>
                                                    <ToggleGroupControlOption
                                                        label="Center"
                                                        value="center"/>
                                                    <ToggleGroupControlOption
                                                        label="Right"
                                                        value="right"/>
                                                </ToggleGroupControl>
                                            </FlexBlock>
                                            <FlexBlock>
                                                <ToggleGroupControl
                                                    isBlock
                                                    label="Distribution"
                                                    onChange={ ( newValue ) => dispatch({ type: 'UPDATE_SETTING', group: 'blocks', key: 'grow', value: newValue}) }
                                                    value={settings.blocks.grow}>
                                                    <ToggleGroupControlOption
                                                        label="Auto"
                                                        value="0"/>
                                                    <ToggleGroupControlOption
                                                        label="Fill container"
                                                        value="1"/>
                                                </ToggleGroupControl>
                                            </FlexBlock>
                                            <FlexBlock>
                                                <ToggleGroupControl
                                                    help={<>
                                                        Some older versions of browsers do not support this property. You can check the current level of support by clicking
                                                        <a target='_blank' rel='noreferrer' href='https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio#browser_compatibility'>here</a>
                                                    </>}
                                                    isBlock
                                                    label="Aspect ratio"
                                                    onChange={ ( newValue ) => dispatch({ type: 'UPDATE_SETTING', group: 'blocks', key: 'aspectRatio', value: newValue}) }
                                                    value={settings.blocks.aspectRatio}>
                                                    <ToggleGroupControlOption
                                                        label="Auto"
                                                        value="auto"/>
                                                    <ToggleGroupControlOption
                                                        label="Square"
                                                        value="1"/>
                                                </ToggleGroupControl>
                                            </FlexBlock>
                                        </Flex>
                                    </FlexItem>
                                </Flex>
                            </FlexBlock>
                        </Flex>
                    </PanelRow>
                </PanelBody>
                <PanelBody title="Presets"
                    className={ openedPanel !== 'panel6' && 'is-disabled' }
                    opened={openedPanel === 'panel6'}
                    onToggle={(opened) => togglePanel(opened ? 'panel6' : '')}>
                    <PanelRow>
                        <Flex direction="column" gap={6} style={{ width: '100%' }}>
                            <FlexBlock>
                                <Flex wrap={true} gap={6} align='flex-start' justify="unset">
                                    <FlexItem>
                                        
                                    </FlexItem>
                                </Flex>
                            </FlexBlock>
                        </Flex>
                    </PanelRow>
                </PanelBody>
                <PanelBody title="After expiration"
                    className={ openedPanel !== 'panel7' && 'is-disabled' }
                    opened={openedPanel === 'panel7'}
                    onToggle={(opened) => togglePanel(opened ? 'panel7' : '')}>
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
                                    onChange={ ( newValue ) => dispatch({ type: 'UPDATE_SETTING', group: 'expiration', key: 'visibility', value: newValue}) }
                                    selected={settings.expiration.visibility}/>
                            </FlexBlock>
                            { settings.expiration.visibility === 'text' && <FlexBlock>
                                <TextareaControl
                                    label="Text"
                                    onChange={ ( newValue ) => dispatch({ type: 'UPDATE_SETTING', group: 'expiration', key: 'text', value: newValue}) }
                                    selected={settings.expiration.text}/>
                            </FlexBlock>}
                        </Flex>
                    </PanelRow>
                </PanelBody>
                <PanelBody title="Preview"
                    className={ openedPanel !== 'panel8' && 'is-disabled' }
                    opened={openedPanel === 'panel8'}
                    onToggle={(opened) => togglePanel(opened ? 'panel8' : '')}>
                    <PanelRow>
                        <Flex direction="column" gap={6} style={{ width: '100%' }}>
                            <FlexBlock>
                                <BaseControl label="Background color">
                                    <ColorPicker
                                        copyFormat='hex'
                                        onChange={ ( newValue ) => setPreviewBg( newValue ) }
                                        color={previewBg}/>
                                </BaseControl>
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