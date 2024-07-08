import { ComboboxControl, RangeControl, TimePicker, Tip, ColorPicker, FontSizePicker, Panel, PanelBody, PanelRow, Flex, FlexBlock, TextControl, CardDivider, BaseControl, FlexItem } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import CountdownTimer from '../timer/CountdownTimer';
import '@wordpress/components/build-style/style.css';
import React, { Fragment } from 'react';
import CountdownTimerPreview from './CountdownTimerPreview';

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

const unitFontSizeOptions = [
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

const unitFontWightOptions = [
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

    const [ unitFontFamily, setUnitFontFamily ] = useState( 'monospace' );
    const [ unitFontWeight, setUnitFontWeight ] = useState( '700' );
    const [ unitFontSize, setUnitFontSize ] = useState( 13 );
    const [ unitFontColor, setUnitFontColor ] = useState( '#000000' );

    const [ timeSeparator, setTimeSeparator ] = useState( '' );
    const [ timeSeparatorColor, setTimeSeparatorColor ] = useState( '#000000' );
    const [ daySeparator, setDaySeparator ] = useState( '' );
    const [ daySeparatorColor, setDaySeparatorColor ] = useState( '#000000' );

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
                family: unitFontFamily,
                weight: unitFontWeight,
                size: unitFontSize,
                color: unitFontColor
            },
        },
        separators: {
            time: {
                value: timeSeparator,
                color: timeSeparatorColor
            },
            day: {
                value: daySeparator,
                color: daySeparatorColor
            }
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
                    color: timeSeparatorColor
                },
                day: {
                    value: daySeparator,
                    color: daySeparatorColor
                }
            }
        })
    }, [timeSeparator, daySeparator, timeSeparatorColor, daySeparatorColor]);

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
                    family: unitFontFamily,
                    weight: unitFontWeight,
                    size: unitFontSize,
                    color: unitFontColor
                }
            }
        })
    }, [unitFontFamily, unitFontWeight, unitFontSize, unitFontColor]);

    return (
        <div>
            <CountdownTimerPreview settings={settings}/>

            <Panel header="Settings">
                <Fragment key=".0">
                <PanelBody title="Date & time, timezone">
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
                                    options={timezoneOptions}
                                    onChange={ ( newTimezone ) => setTimezone( newTimezone ) }
                                    value={timezone}/>
                            </FlexItem>
                        </Flex>
                    </PanelRow>
                </PanelBody>
                <PanelBody title="Numbers Font" initialOpen={false}>
                    <PanelRow>
                        <Flex direction="column" gap={6} style={{ width: '100%' }}>
                            <FlexBlock>
                                <Flex wrap={true} gap={6} align='flex-start' justify="unset">
                                    <FlexItem style={{ width: '300px' }}>
                                        <ComboboxControl
                                            label="Font style"
                                            options={numbersFontWightOptions}
                                            __next40pxDefaultSize
                                            onChange={ ( newValue ) => setNumbersFontWeight( newValue ) }
                                            value={numbersFontWeight}/>
                                    </FlexItem>
                                    <FlexItem style={{ width: '300px' }}>
                                        <FontSizePicker
                                            fontSizes={numbersFontSizeOptions}
                                            __next40pxDefaultSize
                                            units={[ 'px' ]}
                                            onChange={ ( newValue ) => setNumbersFontSize( newValue ) }
                                            value={numbersFontSize}/>
                                    </FlexItem>
                                </Flex>
                            </FlexBlock>
                            <FlexBlock>
                                <Tip>The <u>monospace</u> font is used to avoid number shifting.</Tip>
                            </FlexBlock>
                        </Flex>
                    </PanelRow>
                </PanelBody>
                <PanelBody title="Units Font" initialOpen={false}>
                    <PanelRow>
                        <Flex direction="column" gap={6} style={{ width: '100%' }}>
                            <FlexBlock>
                                <Flex wrap={true} gap={6} align='flex-start' justify="unset">
                                    <FlexItem style={{ width: '300px' }}>
                                        <ComboboxControl
                                            label="Font style"
                                            __next40pxDefaultSize
                                            options={unitFontWightOptions}
                                            onChange={ ( newValue ) => setUnitFontWeight( newValue ) }
                                            value={unitFontWeight}/>
                                    </FlexItem>
                                    <FlexItem style={{ width: '300px' }}>
                                        <FontSizePicker
                                            fontSizes={unitFontSizeOptions}
                                            __next40pxDefaultSize
                                            units={[ 'px' ]}
                                            onChange={ ( newValue ) => setUnitFontSize( newValue ) }
                                            value={unitFontSize}/>
                                    </FlexItem>
                                </Flex>
                            </FlexBlock>
                        </Flex>
                    </PanelRow>
                </PanelBody>
                <PanelBody title="Colors" initialOpen={false}>
                    <PanelRow>
                        <Flex direction="column" gap={6} style={{ width: '100%' }}>
                            <FlexBlock>
                                <Flex wrap={true} gap={6} justify="">
                                    <FlexItem>
                                        <BaseControl label="Numbers color">
                                            <ColorPicker
                                                copyFormat='hex'
                                                onChange={ ( newValue ) => setNumbersFontColor( newValue ) }
                                                color={numbersFontColor}/>
                                        </BaseControl>
                                    </FlexItem>
                                    <FlexItem>
                                        <BaseControl label="Units color">
                                            <ColorPicker
                                                copyFormat='hex'
                                                onChange={ ( newValue ) => setUnitFontColor( newValue ) }
                                                color={unitFontColor}/>
                                        </BaseControl>
                                    </FlexItem>
                                    <FlexItem>
                                        <BaseControl label="Time separator color">
                                            <ColorPicker
                                                copyFormat='hex'
                                                onChange={ ( newValue ) => setTimeSeparatorColor( newValue ) }
                                                color={timeSeparatorColor}/>
                                        </BaseControl>
                                    </FlexItem>
                                    <FlexItem>
                                        <BaseControl label="Day separator color">
                                            <ColorPicker
                                                copyFormat='hex'
                                                onChange={ ( newValue ) => setDaySeparatorColor( newValue ) }
                                                color={daySeparatorColor}/>
                                        </BaseControl>
                                    </FlexItem>
                                </Flex>
                            </FlexBlock>
                        </Flex>
                    </PanelRow>
                </PanelBody>
                <PanelBody title="Text" initialOpen={false}>
                    <PanelRow>
                        <Flex direction="column" expanded={true} gap={10} style={{ width: '100%' }}>
                            <FlexBlock>
                                <TextControl
                                    label="Days"
                                    __next40pxDefaultSize
                                    help="The text that is displayed for 'Days'"
                                    onChange={ ( newValue ) => setDayUnit( newValue ) }
                                    value={ dayUnit }/>
                                <TextControl
                                    label="Hours"
                                    __next40pxDefaultSize
                                    help="The text that is displayed for 'Hours'"
                                    onChange={ ( newValue ) => setHourUnit( newValue ) }
                                    value={ hourUnit }/>
                                <TextControl
                                    label="Minutes"
                                    __next40pxDefaultSize
                                    help="The text that is displayed for 'Minutes'"
                                    onChange={ ( newValue ) => setMinuteUnit( newValue ) }
                                    value={ minuteUnit }/>
                                <TextControl
                                    label="Seconds"
                                    __next40pxDefaultSize
                                    help="The text that is displayed for 'Seconds'"
                                    onChange={ ( newValue ) => setSecondUnit( newValue ) }
                                    value={ secondUnit }/>
                                <CardDivider margin={5}/>
                                <TextControl
                                    label="Separator"
                                    __next40pxDefaultSize
                                    help="Time separator (ex. H:M:S)"
                                    onChange={ ( newValue ) => setTimeSeparator( newValue ) }
                                    value={ timeSeparator }/>
                                <TextControl
                                    label="Day Separator"
                                    __next40pxDefaultSize
                                    help="Separator between days and time"
                                    onChange={ ( newValue ) => setDaySeparator( newValue ) }
                                    value={ daySeparator }/>
                            </FlexBlock>
                        </Flex>
                    </PanelRow>
                </PanelBody>
                </Fragment>
            </Panel>

            {/* <RangeControl
                label="Choose unit font size"
                help="Please select how transparent you would like this."
                initialPosition={50}
                max={1}
                min={0}
                step={0.05}
                onChange={function noRefCheck(){}}
            /> */}
        </div>
    );
};

export default CountdownTimerEditor;