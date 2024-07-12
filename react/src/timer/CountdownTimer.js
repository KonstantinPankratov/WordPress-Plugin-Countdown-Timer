import { useCountdown } from './hooks/useCountdown';
import './css/countdownTimer.scss';

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
			flexGrow: style?.grow,
			aspectRatio: style?.aspectRatio,
			boxShadow: boxShadow,
			
			'--the-cdt-value-size': size }}>
			{children}
		</div>
	);
};

function CountdownDelimiter ({ delimiter })
{
	return (
		<div className="the-cdt-delimiter" style={{ color: delimiter.color, fontSize: delimiter.size, fontWeight: delimiter.weight }}>{delimiter.symbol}</div>
	);
};

export default function CountdownTimer ({ config })
{
	const {days, hours, minutes, seconds, expired} = useCountdown(config.datetime, config.timezone);
	const expirationVisibility = config?.expiration?.visibility || 'keep'

	return (
		<>
		{ (!expired || expirationVisibility === 'keep') && <div className={`the-cdt`} style={{ gap: config.container?.gap + 'px', justifyContent: config.container?.alignment }}>

			<CountdownBlock size={config?.numbersFont?.size} style={config.blocks}>
				<CountdownValue font={config?.numbersFont}>{days.toString().padStart(2, "0")}</CountdownValue>
				<CountdownUnit font={config.unitsFont}>{config.defaultUnits?.days}</CountdownUnit>
			</CountdownBlock>

			{ config?.daySeparator?.symbol && <CountdownDelimiter delimiter={config?.daySeparator}/>}


			<CountdownBlock size={config?.numbersFont?.size} style={config.blocks}>
				<CountdownValue font={config?.numbersFont}>{hours.toString().padStart(2, "0")}</CountdownValue>
				<CountdownUnit font={config.unitsFont}>{config.defaultUnits?.hours}</CountdownUnit>
			</CountdownBlock>

			{ config?.timeSeparator?.symbol && <CountdownDelimiter delimiter={config?.timeSeparator}/>}

			<CountdownBlock size={config?.numbersFont?.size} style={config.blocks}>
				<CountdownValue font={config?.numbersFont}>{minutes.toString().padStart(2, "0")}</CountdownValue>
				<CountdownUnit font={config.unitsFont}>{config.defaultUnits?.minutes}</CountdownUnit>
			</CountdownBlock>

			{ config?.timeSeparator?.symbol && <CountdownDelimiter delimiter={config?.timeSeparator}/>}

			<CountdownBlock size={config?.numbersFont?.size} style={config.blocks}>
				<CountdownValue font={config?.numbersFont}>{seconds.toString().padStart(2, "0")}</CountdownValue>
				<CountdownUnit font={config.unitsFont}>{config.defaultUnits?.seconds}</CountdownUnit>
			</CountdownBlock>
		</div> }

		{ (expired && expirationVisibility === 'text') && <div className={`the-cdt`} style={{ gap: config.blocks?.gap, justifyContent: config.blocks?.alignment }}>
			<CountdownBlock size={config?.numbersFont?.size} style={config.blocks}>
				<p className='the-cdt-expiration-text'>{config?.expiration?.text}</p>
			</CountdownBlock>
		</div> }
		</>
	);
};