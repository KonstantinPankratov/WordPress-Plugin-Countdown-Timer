import { ComboboxControl, RangeControl, TimePicker, Tip, ColorPicker, FontSizePicker } from '@wordpress/components';
import { useState } from 'react';
import '@wordpress/components/build-style/style.css';
import CountdownTimer from '../../the-coundown-timer/src/components/CountdownTimer';

const CountdownTimerEditor = () => {
    const date = new Date();
    const [ time, setTime ] = useState( new Date() );

    return (
        <div>
            <TimePicker
                label="Pick date and time"
                currentTime={ date }
                onChange={ ( newTime ) => setTime( newTime ) }
                is12Hour={ false }
            />

            <ComboboxControl
                label="Pick timezone"
                onChange={function noRefCheck(){}}
                onFilterValueChange={function noRefCheck(){}}
                options={[
                {
                    label: 'Afghanistan',
                    value: 'AF'
                },
                {
                    label: 'Åland Islands',
                    value: 'AX'
                },
                ]}
                value={null}
            />

            <RangeControl
                label="Choose unit font size"
                help="Please select how transparent you would like this."
                initialPosition={50}
                max={1}
                min={0}
                step={0.05}
                onChange={function noRefCheck(){}}
            />

            <Tip>
                It's important to..
            </Tip>

            <FontSizePicker
                fontSizes={[
                    {
                    name: 'Small',
                    size: 12,
                    slug: 'small'
                    },
                    {
                    name: 'Normal',
                    size: 16,
                    slug: 'normal'
                    },
                    {
                    name: 'Big',
                    size: 26,
                    slug: 'big'
                    }
                ]}
                onChange={function noRefCheck(){}}
                value={16}
            />


            <ColorPicker onChange={function noRefCheck(){}} label="Pick background color" />

            <CountdownTimer/>
        </div>
    );
};

export default CountdownTimerEditor;