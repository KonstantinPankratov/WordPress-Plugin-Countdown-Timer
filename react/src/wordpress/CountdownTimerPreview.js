import CountdownTimer from '../timer/CountdownTimer';
import { useCountdown } from '../timer/hooks/useCountdown';
import { Card, CardBody, CardFooter, CardHeader } from '@wordpress/components';

const CountdownTimerPreview = ({ settings, preview }) => {
	const { expired } = useCountdown(settings.datetime, settings.timezone, settings.enabledUnits);
    
    return (
    <Card style={{ marginBottom: '10px' }}>
        <CardHeader>Preview</CardHeader>
        <CardBody style={{ backgroundColor: preview.bg }}>
            <CountdownTimer config={settings}/>
        </CardBody>
        {expired && <CardFooter isShady={true} size="small"><small>Why are zeros displayed? Set <u>future</u> date &amp; time.</small></CardFooter>}
    </Card>
    );
};

export default CountdownTimerPreview;