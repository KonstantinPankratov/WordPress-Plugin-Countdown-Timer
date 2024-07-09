import React from 'react';
import { useEffect, useState } from '@wordpress/element';
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

const timezoneOptions = [
    {
        value: 'UTC',
        label: 'UTC'
    }
]

const  numbersFontFamilyOptions = [
    {
        value: 'monospace',
        label: 'Monospace',
    }
];

const numbersFontSizeOptions = [
    {
        name: 'Small',
        size: 30,
        slug: 'small'
    },
    {
        name: 'Normal',
        size: 40,
        slug: 'normal'
    },
    {
        name: 'Big',
        size: 60,
        slug: 'big'
    }
];

const numbersFontWightOptions = [
    {
        value: '400',
        label: 'Regular',
    },
    {
        value: '700',
        label: 'Bold',
    }
];

const unitsFontSizeOptions = [
    {
        name: 'Small',
        size: 10,
        slug: 'small'
    },
    {
        name: 'Normal',
        size: 13,
        slug: 'normal'
    },
    {
        name: 'Big',
        size: 16,
        slug: 'big'
    }
];

const unitsFontWightOptions = [
    {
        value: '200',
        label: 'Thin',
    },
    {
        value: '400',
        label: 'Regular',
    },
    {
        value: '500',
        label: 'Semibold',
    },
    {
        value: '700',
        label: 'Bold',
    },
    {
        value: '900',
        label: 'Black'
    },
];

const CountdownTimerEditor = () => {
    const [ openedPanel, togglePanel ] = useState( '' );
    const [ previewBg, setPreviewBg ] = useState( '#FFFFFF' );

    const [ datetime, setDatetime ] = useState( new Date().toISOString().slice(0,16) );
    const [ timezone, setTimezone ] = useState( 'UTC' );

    const [ dayUnit, setDayUnit ] = useState( 'Days' );
    const [ hourUnit, setHourUnit ] = useState( 'Hours' );
    const [ minuteUnit, setMinuteUnit ] = useState( 'Minutes' );
    const [ secondUnit, setSecondUnit ] = useState( 'Seconds' );

    const [ numbersFontFamily, setNumbersFontFamily ] = useState( 'monospace' );
    const [ numbersFontWeight, setNumbersFontWeight ] = useState( '700' );
    const [ numbersFontSize, setNumbersFontSize ] = useState( 40 );
    const [ numbersFontColor, setNumbersFontColor ] = useState( '#000000' );

    const [ unitsFontFamily, setUnitsFontFamily ] = useState( 'monospace' );
    const [ unitsFontWeight, setUnitsFontWeight ] = useState( '700' );
    const [ unitsFontSize, setUnitsFontSize ] = useState( 13 );
    const [ unitsFontColor, setUnitsFontColor ] = useState( '#000000' );

    const [ timeSeparator, setTimeSeparator ] = useState( '' );
    const [ timeSeparatorColor, setTimeSeparatorColor ] = useState( '#000000' );
    const [ timeSeparatorWeight, setTimeSeparatorWeight ] = useState( '700' );
    const [ timeSeparatorSize, setTimeSeparatorSize ] = useState( 40 );

    const [ daySeparator, setDaySeparator ] = useState( '' );
    const [ daySeparatorColor, setDaySeparatorColor ] = useState( '#000000' );
    const [ daySeparatorWeight, setDaySeparatorWeight ] = useState( '700' );
    const [ daySeparatorSize, setDaySeparatorSize ] = useState( 40 );

    const [ blockBg, setBlockBg ] = useState( 'transparent' );
    const [ blockRounding, setBlockRounding ] = useState( 0 );
    const [ blockSpaceBetween, setBlockSpaceBetween ] = useState( 0 );
    const [ blockSpaceWithin, setBlockSpaceWithin ] = useState( 0 );
    const [ blockBorder, setBlockBorder ] = useState( {
        color: '',
        width: 0,
        style: 'none'
    } );
    const [ blockShadow, setBlockShadow ] = useState( {
        color: '',
        width: 0
    } );
    const [ blockAlignment, setBlockAlignment ] = useState( 'left' );


    const [ afterExpirationVisibility, setAfterExpirationVisibility ] = useState( 'keep' );
    const [ afterExpirationText, setAfterExpirationText ] = useState( '' );

    const [ settings, setSettings ] = useState({
        datetime,
        timezone,
        units: {
            day: dayUnit,
            hour: hourUnit,
            minute: minuteUnit,
            second: secondUnit,
        },
        font: {
            number: {
                family: numbersFontFamily,
                weight: numbersFontWeight,
                size: numbersFontSize,
                color: numbersFontColor
            },
            unit: {
                family: unitsFontFamily,
                weight: unitsFontWeight,
                size: unitsFontSize,
                color: unitsFontColor
            },
        },
        separators: {
            time: {
                value: timeSeparator,
                size: timeSeparatorSize,
                weight: timeSeparatorWeight,
                color: timeSeparatorColor
            },
            day: {
                value: daySeparator,
                size: daySeparatorSize,
                weight: daySeparatorWeight,
                color: daySeparatorColor
            }
        },
        block: {
            bg: blockBg,
            border: blockBorder,
            rounding: blockRounding,
            shadow: blockShadow,
            gap: blockSpaceBetween,
            padding: blockSpaceWithin,
            alignment: blockAlignment
        },
        expiration: {
            visibility: afterExpirationVisibility,
            text: afterExpirationText
        }
    });

    useEffect(() => {
        setSettings({
            ...settings,
            datetime
        })
    }, [datetime]);

    useEffect(() => {
        setSettings({
            ...settings,
            timezone
        })
    }, [timezone]);

    useEffect(() => {
        setSettings({
            ...settings,
            units: {
                day: dayUnit,
                hour: hourUnit,
                minute: minuteUnit,
                second: secondUnit,
            }
        })
    }, [dayUnit, hourUnit, minuteUnit, secondUnit]);

    useEffect(() => {
        setSettings({
            ...settings,
            separators: {
                time: {
                    value: timeSeparator,
                    size: timeSeparatorSize,
                    weight: timeSeparatorWeight,
                    color: timeSeparatorColor
                },
                day: {
                    value: daySeparator,
                    size: daySeparatorSize,
                    weight: daySeparatorWeight,
                    color: daySeparatorColor
                }
            }
        })
    }, [timeSeparator, timeSeparatorColor, timeSeparatorSize, timeSeparatorWeight, daySeparator, daySeparatorColor, daySeparatorSize, daySeparatorWeight]);

    useEffect(() => {
        setSettings({
            ...settings,
            font: {
                ...settings.font,
                number: {
                    family: numbersFontFamily,
                    weight: numbersFontWeight,
                    size: numbersFontSize,
                    color: numbersFontColor
                }
            }
        })
    }, [numbersFontFamily, numbersFontWeight, numbersFontSize, numbersFontColor]);

    useEffect(() => {
        setSettings({
            ...settings,
            font: {
                ...settings.font,
                unit: {
                    family: unitsFontFamily,
                    weight: unitsFontWeight,
                    size: unitsFontSize,
                    color: unitsFontColor
                }
            }
        })
    }, [unitsFontFamily, unitsFontWeight, unitsFontSize, unitsFontColor]);

    useEffect(() => {
        setSettings({
            ...settings,
            block: {
                bg: blockBg,
                border: blockBorder,
                rounding: blockRounding + 'px',
                shadow: blockShadow,
                gap: blockSpaceBetween + 'px',
                padding: blockSpaceWithin + 'px',
                alignment: blockAlignment
            }
        })
    }, [blockBg, blockBorder, blockRounding, blockShadow, blockSpaceBetween, blockSpaceWithin, blockAlignment])

    useEffect(() => {
        setSettings({
            ...settings,
            expiration: {
                visibility: afterExpirationVisibility,
                text: afterExpirationText
            }
        })
    }, [afterExpirationVisibility, afterExpirationText])

    const css = `
        .components-panel__body-toggle.components-button:focus{
            box-shadow: none;
        }
        .components-panel__body.is-disabled {
            background: rgba(0, 0, 0, 0.025);
        }
        .components-panel__body.is-opened .components-panel__body-toggle {
            font-weight: 900;
        }
    `
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
                                    onChange={ ( newDatetime ) => setDatetime( newDatetime ) }
                                    value={ datetime }/>
                            </FlexItem>
                            <FlexItem style={{ width: '300px' }}>
                                <ComboboxControl
                                    label="Timezone"
                                    __next40pxDefaultSize
                                    allowReset={false}
                                    options={timezoneOptions}
                                    onChange={ ( newTimezone ) => setTimezone( newTimezone ) }
                                    value={timezone}/>
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
                                                    onChange={ ( newValue ) => setNumbersFontWeight( newValue ) }
                                                    value={numbersFontWeight}/>
                                            </FlexBlock>
                                            <FlexBlock>
                                                <FontSizePicker
                                                    fontSizes={numbersFontSizeOptions}
                                                    __next40pxDefaultSize
                                                    withReset={false}
                                                    numberss={[ 'px' ]}
                                                    onChange={ ( newValue ) => setNumbersFontSize( newValue ) }
                                                    value={numbersFontSize}/>
                                            </FlexBlock>
                                        </Flex>
                                    </FlexItem>
                                    <FlexItem style={{ width: '300px' }}>
                                        <BaseControl label="Color">
                                            <ColorPicker
                                                copyFormat='hex'
                                                enableAlpha={true}
                                                onChange={ ( newValue ) => setNumbersFontColor( newValue ) }
                                                color={numbersFontColor}/>
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
                                    onChange={ ( newValue ) => setDayUnit( newValue ) }
                                    value={ dayUnit }/>
                                    </FlexBlock>
                                    <FlexBlock>
                                        <TextControl
                                    label="Hours"
                                    __next40pxDefaultSize
                                    help="The text that is displayed for 'Hours'"
                                    onChange={ ( newValue ) => setHourUnit( newValue ) }
                                    value={ hourUnit }/>
                                    </FlexBlock>
                                    <FlexBlock>
                                        <TextControl
                                    label="Minutes"
                                    __next40pxDefaultSize
                                    help="The text that is displayed for 'Minutes'"
                                    onChange={ ( newValue ) => setMinuteUnit( newValue ) }
                                    value={ minuteUnit }/>
                                    </FlexBlock>
                                    <FlexBlock>
                                        <TextControl
                                    label="Seconds"
                                    __next40pxDefaultSize
                                    help="The text that is displayed for 'Seconds'"
                                    onChange={ ( newValue ) => setSecondUnit( newValue ) }
                                    value={ secondUnit }/>
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
                                                    onChange={ ( newValue ) => setUnitsFontWeight( newValue ) }
                                                    value={unitsFontWeight}/>
                                            </FlexBlock>
                                            <FlexBlock>
                                                <FontSizePicker
                                                    fontSizes={unitsFontSizeOptions}
                                                    __next40pxDefaultSize
                                                    withReset={false}
                                                    units={[ 'px' ]}
                                                    onChange={ ( newValue ) => setUnitsFontSize( newValue ) }
                                                    value={unitsFontSize}/>
                                            </FlexBlock>
                                        </Flex>
                                    </FlexItem>
                                    <FlexItem style={{ width: '300px' }}>
                                        <BaseControl label="Color">
                                            <ColorPicker
                                                copyFormat='hex'
                                                enableAlpha={true}
                                                onChange={ ( newValue ) => setUnitsFontColor( newValue ) }
                                                color={unitsFontColor}/>
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
                                                    onChange={ ( newValue ) => setTimeSeparator( newValue ) }
                                                    value={ timeSeparator }/>
                                            </FlexBlock>
                                            <FlexBlock>
                                                <ComboboxControl
                                                    label="Style"
                                                    __next40pxDefaultSize
                                                    allowReset={false}
                                                    options={numbersFontWightOptions}
                                                    onChange={ ( newValue ) => setTimeSeparatorWeight( newValue ) }
                                                    value={timeSeparatorWeight}/>
                                            </FlexBlock>
                                            <FlexBlock>
                                                <FontSizePicker
                                                    fontSizes={numbersFontSizeOptions}
                                                    __next40pxDefaultSize
                                                    withReset={false}
                                                    units={[ 'px' ]}
                                                    onChange={ ( newValue ) => setTimeSeparatorSize( newValue ) }
                                                    value={timeSeparatorSize}/>
                                            </FlexBlock>
                                        </Flex>
                                    </FlexItem>
                                    <FlexItem>
                                        <BaseControl label="Time separator color">
                                            <ColorPicker
                                                copyFormat='hex'
                                                onChange={ ( newValue ) => setTimeSeparatorColor( newValue ) }
                                                color={timeSeparatorColor}/>
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
                                                    onChange={ ( newValue ) => setDaySeparator( newValue ) }
                                                    value={ daySeparator }/>
                                            </FlexBlock>
                                            <FlexBlock>
                                                <ComboboxControl
                                                    label="Style"
                                                    __next40pxDefaultSize
                                                    allowReset={false}
                                                    options={numbersFontWightOptions}
                                                    onChange={ ( newValue ) => setDaySeparatorWeight( newValue ) }
                                                    value={daySeparatorWeight}/>
                                            </FlexBlock>
                                            <FlexBlock>
                                                <FontSizePicker
                                                    fontSizes={numbersFontSizeOptions}
                                                    __next40pxDefaultSize
                                                    withReset={false}
                                                    units={[ 'px' ]}
                                                    onChange={ ( newValue ) => setDaySeparatorSize( newValue ) }
                                                    value={daySeparatorSize}/>
                                            </FlexBlock>
                                        </Flex>
                                    </FlexItem>
                                    <FlexItem>
                                        <BaseControl label="Day separator color">
                                            <ColorPicker
                                                copyFormat='hex'
                                                enableAlpha={true}
                                                onChange={ ( newValue ) => setDaySeparatorColor( newValue ) }
                                                color={daySeparatorColor}/>
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
                                                onChange={ ( newValue ) => setBlockBg( newValue ) }
                                                color={blockBg}/>
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
                                                    value={blockRounding}
                                                    onChange={ (newValue) => setBlockRounding( newValue ) }/>
                                            </FlexBlock>
                                            <FlexBlock>
                                                <BorderControl
                                                    label="Border"
                                                    value={blockBorder}
                                                    disableUnits={true}
                                                    onChange={ (newValue) => setBlockBorder( newValue ) }/>
                                            </FlexBlock>
                                            <FlexBlock>
                                                <BorderControl
                                                    label="Shadow"
                                                    value={blockShadow}
                                                    enableStyle={false}
                                                    disableUnits={true}
                                                    placeholder="Blur"
                                                    onChange={ (newValue) => setBlockShadow( newValue ) }/>
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
                                                    value={blockSpaceBetween}
                                                    onChange={ (newValue) => setBlockSpaceBetween( newValue ) }/>
                                            </FlexBlock>
                                            <FlexBlock>
                                                <NumberControl
                                                    __next40pxDefaultSize
                                                    label="Spacing within blocks"
                                                    min={0}
                                                    spinControls="custom"
                                                    required={true}
                                                    value={blockSpaceWithin}
                                                    onChange={ (newValue) => setBlockSpaceWithin( newValue ) }/>
                                            </FlexBlock>
                                        </Flex>
                                    </FlexItem>
                                    <FlexItem style={{ width: '300px' }}>
                                        <Flex direction="column" gap={6} style={{ width: '100%' }}>
                                            <FlexBlock>
                                                <ToggleGroupControl
                                                    isBlock
                                                    label="Alignment"
                                                    value={blockAlignment}
                                                    onChange={ (newValue) => setBlockAlignment( newValue ) }>
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
                                        </Flex>
                                    </FlexItem>
                                </Flex>
                            </FlexBlock>
                        </Flex>
                    </PanelRow>
                </PanelBody>
                <PanelBody title="After expiration"
                    className={ openedPanel !== 'panel6' && 'is-disabled' }
                    opened={openedPanel === 'panel6'}
                    onToggle={(opened) => togglePanel(opened ? 'panel6' : '')}>
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
                                    onChange={ ( newValue ) => setAfterExpirationVisibility( newValue ) }
                                    selected={afterExpirationVisibility}/>
                            </FlexBlock>
                            { afterExpirationVisibility === 'text' && <FlexBlock>
                                <TextareaControl
                                    label="Text"
                                    onChange={ ( newValue ) => setAfterExpirationText( newValue ) }
                                    value={afterExpirationText}/> 
                            </FlexBlock>}
                        </Flex>
                    </PanelRow>
                </PanelBody>
                <PanelBody title="Preview"
                    className={ openedPanel !== 'panel7' && 'is-disabled' }
                    opened={openedPanel === 'panel7'}
                    onToggle={(opened) => togglePanel(opened ? 'panel7' : '')}>
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

            <style>{css}</style>
        </div>
    );
};

export default CountdownTimerEditor;