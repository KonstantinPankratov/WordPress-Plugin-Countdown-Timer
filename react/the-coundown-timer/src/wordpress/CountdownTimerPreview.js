import { useEffect, useState } from '@wordpress/element';
import CountdownTimer from '../timer/CountdownTimer';
import { Card, CardBody, CardFooter, CardHeader } from '@wordpress/components';

const CountdownTimerPreview = ({ settings, preview }) => {
    const [isDatetimeValid, setIsDatetimeValid] = useState();

    useEffect(() => {
        setIsDatetimeValid(
            new Date(settings.datetime) > new Date()
        )
    }, [settings.datetime])
    
    return (
    <Card style={{ marginBottom: '10px' }}>
        <CardHeader>Preview</CardHeader>
        <CardBody style={{ backgroundColor: preview.bg }}>
            <CountdownTimer settings={settings}/>
        </CardBody>
        {!isDatetimeValid && <CardFooter isShady={true} size="small"><small>Why are zeros displayed? Set <u>future</u> date &amp; time.</small></CardFooter>}
    </Card>
    );
};

export default CountdownTimerPreview;