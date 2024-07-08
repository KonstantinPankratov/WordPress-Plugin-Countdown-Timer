import { useState } from '@wordpress/element';
import Draggable from 'react-draggable';
import CountdownTimer from '../timer/CountdownTimer';
import { Card, CardBody, CardHeader } from '@wordpress/components';

const CountdownTimerPreview = ({ settings }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleStart = () => {
        setIsDragging(true);
    };

    const handleStop = () => {
        setIsDragging(false);
    };

    return (
        <Draggable
        onStart={handleStart}
        onStop={handleStop}
        bounds='body'>
            <Card style={{
                // position: 'absolute',
                display: 'inline-block',
                marginBottom: '20px',
                cursor: isDragging ? 'grabbing' : 'grab',
                zIndex: 9999
            }}>
                <CardHeader>Preview <small>drag &amp; drop me</small></CardHeader>
                <CardBody>
                    <CountdownTimer settings={settings}/>
                </CardBody>
            </Card>
        </Draggable>
    );
};

export default CountdownTimerPreview;