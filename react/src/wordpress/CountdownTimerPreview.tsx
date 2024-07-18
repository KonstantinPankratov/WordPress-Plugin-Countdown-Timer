import CountdownTimer from '../timer/CountdownTimer';
import useCountdown from '../timer/hooks/useCountdown';
import { Card, CardBody, CardFooter, CardHeader } from '@wordpress/components';
import IConfig, { IPreview } from '../types/config';

interface ICountdownTimerPreview {
    settings: IConfig,
    preview: IPreview
}

const CountdownTimerPreview = ({ settings, preview }: ICountdownTimerPreview) => {
	const { expired } = useCountdown(settings.datetime!, settings.timezone!, settings.enabledUnits);
    
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