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

function CountdownBlock ({ size, style, children })
{
	const boxShadow = (style?.shadow?.width || style?.shadow?.width === 0) ? `0 0 ${style?.shadow?.width} ${style?.shadow?.color}` : 'none';

	return (
		<div className="the-cdt-block" style={{
			padding: style?.padding + 'px',
			backgroundColor: style?.background,
			borderStyle: style?.border?.style,
			borderWidth: style?.border?.width,
			borderColor: style?.border?.color,
			borderRadius: style?.rounding,
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
		{ (!expired || expirationVisibility === 'keep') && <div className={`the-cdt`} style={{ gap: settings.container?.gap + 'px', justifyContent: settings.container?.alignment }}>

			<CountdownBlock size={settings?.numbersFont?.size} style={settings.blocks}>
				<CountdownValue font={settings?.numbersFont}>{days.toString().padStart(2, "0")}</CountdownValue>
				<CountdownUnit font={settings.unitsFont}>{settings.defaultUnits?.days}</CountdownUnit>
			</CountdownBlock>

			{ settings?.daySeparator?.symbol && <CountdownDelimiter delimiter={settings?.daySeparator}/>}


			<CountdownBlock size={settings?.numbersFont?.size} style={settings.blocks}>
				<CountdownValue font={settings?.numbersFont}>{hours.toString().padStart(2, "0")}</CountdownValue>
				<CountdownUnit font={settings.unitsFont}>{settings.defaultUnits?.hours}</CountdownUnit>
			</CountdownBlock>

			{ settings?.timeSeparator?.symbol && <CountdownDelimiter delimiter={settings?.timeSeparator}/>}

			<CountdownBlock size={settings?.numbersFont?.size} style={settings.blocks}>
				<CountdownValue font={settings?.numbersFont}>{minutes.toString().padStart(2, "0")}</CountdownValue>
				<CountdownUnit font={settings.unitsFont}>{settings.defaultUnits?.minutes}</CountdownUnit>
			</CountdownBlock>

			{ settings?.timeSeparator?.symbol && <CountdownDelimiter delimiter={settings?.timeSeparator}/>}

			<CountdownBlock size={settings?.numbersFont?.size} style={settings.blocks}>
				<CountdownValue font={settings?.numbersFont}>{seconds.toString().padStart(2, "0")}</CountdownValue>
				<CountdownUnit font={settings.unitsFont}>{settings.defaultUnits?.seconds}</CountdownUnit>
			</CountdownBlock>
		</div> }

		{ (expired && expirationVisibility === 'text') && <div className={`the-cdt`} style={{ gap: settings.blocks?.gap, justifyContent: settings.blocks?.alignment }}>
			<CountdownBlock size={settings?.numbersFont?.size} style={settings.blocks}>
				<p className='the-cdt-expiration-text'>{settings?.expiration?.text}</p>
			</CountdownBlock>
		</div> }
		</>
	);
};