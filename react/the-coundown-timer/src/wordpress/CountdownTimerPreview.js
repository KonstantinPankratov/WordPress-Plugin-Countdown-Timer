import { useEffect, useState } from '@wordpress/element';
import Draggable from 'react-draggable';
import CountdownTimer from '../timer/CountdownTimer';
import { Card, CardBody, CardFooter, CardHeader } from '@wordpress/components';

const CountdownTimerPreview = ({ settings, preview }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isDatetimeValid, setIsDatetimeValid] = useState();

    const handleStart = () => {
        setIsDragging(true);
    };

    const handleStop = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        setIsDatetimeValid(
            new Date(settings.datetime) > new Date()
        )
    }, [settings.datetime])
    
    return (
        <Draggable
            onStart={handleStart}
            onStop={handleStop}
            defaultPosition={{x: 0, y: 0}}
            bounds=".the-countdown-timer-editor-component">
            <Card style={{
                position: 'fixed',
                display: 'inline-block',
                cursor: isDragging ? 'grabbing' : 'grab',
                zIndex: 9999
            }}>
                <CardHeader>Preview <small>drag &amp; drop me</small></CardHeader>
                <CardBody style={{ backgroundColor: preview.bg }}>
                    <CountdownTimer settings={settings}/>
                </CardBody>
                {!isDatetimeValid && <CardFooter isShady={true} size="small"><small>Why are zeros displayed? Set <u>future</u> date &amp; time.</small></CardFooter>}
            </Card>
        </Draggable>
    );
};

export default CountdownTimerPreview;