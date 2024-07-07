import { useCountdown } from './hooks/useCountdown';
import '../components/css/countdownTimer.scss';

function CountdownBlock ({ value, unit, delimiter })
{
	return (
		<div className="the-cdt-block">
			<div className="the-cdt-value">{value}</div>
			<div className="the-cdt-unit">{unit}</div>
		</div>
	);
};

function CountdownDelimiter ({ delimiter })
{
	return (
		<div className="the-cdt-delimiter">{delimiter}</div>
	);
};

export default function CountdownTimer ({ targetDate, delimiter, style })
{
	const {days, hours, minutes, seconds} = useCountdown(targetDate);

	return (
		<div className={`the-cdt is-${style}`}>
			<CountdownBlock value={days.toString().padStart(2, "0")} unit={'Days'}/>
			{ delimiter && <CountdownDelimiter delimiter={delimiter}/>}
			<CountdownBlock value={hours.toString().padStart(2, "0")} unit={'Hours'} />
			{ delimiter && <CountdownDelimiter delimiter={delimiter}/>}
			<CountdownBlock value={minutes.toString().padStart(2, "0")} unit={'Minutes'} />
			{ delimiter && <CountdownDelimiter delimiter={delimiter}/>}
			<CountdownBlock value={seconds.toString().padStart(2, "0")} unit={'Seconds'} />
		</div>
	);
};