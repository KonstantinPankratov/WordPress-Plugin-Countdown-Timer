import { useCountdown } from './hooks/useCountdown';
import '../timer/css/countdownTimer.scss';

function CountdownValue ({ font, children }) {
	return (
		<div className="the-cdt-value" style={{
			color: font?.color,
			fontFamily: font?.family,
			fontSize: font?.size,
			fontWeight: font?.weight }}>{children}</div>
	)
}

function CountdownUnit ({ font, children }) {
	return (
		<div className="the-cdt-unit" style={{
			color: font?.color,
			fontFamily: font?.family,
			fontSize: font?.size,
			fontWeight: font?.weight }}>{children}</div>
	)
}

function CountdownBlock ({ size, block, children })
{
	const boxShadow = (block.shadow?.width || block.shadow?.width === 0) ? `0 0 ${block.shadow.width} ${block.shadow.color}` : 'none';

	return (
		<div className="the-cdt-block" style={{
			padding: block.padding,
			backgroundColor: block.bg,
			borderStyle: block.border?.style,
			borderWidth: block.border?.width,
			borderColor: block.border?.color,
			borderRadius: block.rounding,
			boxShadow: boxShadow,
			
			'--the-cdt-value-size': size }}>
			{children}
		</div>
	);
};

function CountdownDelimiter ({ delimiter })
{
	return (
		<div className="the-cdt-delimiter" style={{ color: delimiter.color, fontSize: delimiter.size, fontWeight: delimiter.weight }}>{delimiter.value}</div>
	);
};

export default function CountdownTimer ({ settings })
{
	const {days, hours, minutes, seconds, expired} = useCountdown(settings.datetime);
	const expirationVisibility = settings?.expiration?.visibility || 'keep'

	return (
		<>
		{ (!expired || expirationVisibility === 'keep') && <div className={`the-cdt`} style={{ gap: settings.block?.gap, justifyContent: settings.block?.alignment }}>

			<CountdownBlock size={settings?.font?.number?.size} block={settings.block}>
				<CountdownValue font={settings?.font?.number}>{days.toString().padStart(2, "0")}</CountdownValue>
				<CountdownUnit font={settings.font?.unit}>{settings.units.day}</CountdownUnit>
			</CountdownBlock>

			{ settings.separators.day.value && <CountdownDelimiter delimiter={settings.separators.day}/>}


			<CountdownBlock size={settings?.font?.number?.size} block={settings.block}>
				<CountdownValue font={settings?.font?.number}>{hours.toString().padStart(2, "0")}</CountdownValue>
				<CountdownUnit font={settings.font?.unit}>{settings.units.hour}</CountdownUnit>
			</CountdownBlock>

			{ settings.separators.time.value && <CountdownDelimiter delimiter={settings.separators.time}/>}

			<CountdownBlock size={settings?.font?.number?.size} block={settings.block}>
				<CountdownValue font={settings?.font?.number}>{minutes.toString().padStart(2, "0")}</CountdownValue>
				<CountdownUnit font={settings.font?.unit}>{settings.units.minute}</CountdownUnit>
			</CountdownBlock>

			{ settings.separators.time.value && <CountdownDelimiter delimiter={settings.separators.time}/>}

			<CountdownBlock size={settings?.font?.number?.size} block={settings.block}>
				<CountdownValue font={settings?.font?.number}>{seconds.toString().padStart(2, "0")}</CountdownValue>
				<CountdownUnit font={settings.font?.unit}>{settings.units.second}</CountdownUnit>
			</CountdownBlock>
		</div> }

		{ (expired && expirationVisibility === 'text') && <div className={`the-cdt`} style={{ gap: settings.block?.gap, justifyContent: settings.block?.alignment }}>
			<CountdownBlock size={settings?.font?.number?.size} block={settings.block}>
				<p className='the-cdt-expiration-text'>{settings?.expiration?.text}</p>
			</CountdownBlock>
		</div> }
		</>
	);
};