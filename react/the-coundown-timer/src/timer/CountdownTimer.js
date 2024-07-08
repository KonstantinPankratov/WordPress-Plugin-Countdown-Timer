import { useCountdown } from './hooks/useCountdown';
import '../timer/css/countdownTimer.scss';

function CountdownBlock ({ value, unit, font })
{
	return (
		<div className="the-cdt-block">
			<div className="the-cdt-value" style={{ color: font.number.color, fontSize: font.number.size, fontWeight: font.number.weight }}>{value}</div>
			<div className="the-cdt-unit" style={{ color: font.unit.color, fontSize: font.unit.size, fontWeight: font.unit.weight }}>{unit}</div>
		</div>
	);
};

function CountdownDelimiter ({ delimiter })
{
	return (
		<div className="the-cdt-delimiter" style={{ color: delimiter.color }}>{delimiter.value}</div>
	);
};

export default function CountdownTimer ({ settings })
{
	const {days, hours, minutes, seconds} = useCountdown(settings.datetime);

	return (
		<div className={`the-cdt`}>
			<CountdownBlock value={days.toString().padStart(2, "0")} font={settings.font} unit={settings.units.day}/>
			{ settings.separators.day.value && <CountdownDelimiter delimiter={settings.separators.day}/>}
			<CountdownBlock value={hours.toString().padStart(2, "0")} font={settings.font} unit={settings.units.hour} />
			{ settings.separators.time.value && <CountdownDelimiter delimiter={settings.separators.time}/>}
			<CountdownBlock value={minutes.toString().padStart(2, "0")} font={settings.font} unit={settings.units.minute} />
			{ settings.separators.time.value && <CountdownDelimiter delimiter={settings.separators.time}/>}
			<CountdownBlock value={seconds.toString().padStart(2, "0")} font={settings.font} unit={settings.units.second} />
		</div>
	);
};