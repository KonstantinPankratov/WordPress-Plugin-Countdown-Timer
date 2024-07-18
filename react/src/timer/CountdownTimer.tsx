import { CSSProperties, ReactNode } from 'react';
import useCountdown from './hooks/useCountdown';
import './css/countdownTimer.scss';
import IConfig, { IBlocks, IFont, ISeparator, TUnits } from '../types/config';

interface ICDTValue {
	font: IFont,
	children: ReactNode
}

function CountdownValue ({ font, children }: ICDTValue) {
	return (
		<div className="the-cdt-value" style={{
			color: font.color,
			fontFamily: font.family,
			fontSize: font.size,
			fontWeight: font.weight }}>{children}</div>
	)
}

function CountdownUnit ({ font, children }: ICDTValue) {
	return (
		<div className="the-cdt-unit" style={{
			color: font.color,
			fontFamily: font.family,
			fontSize: font.size,
			fontWeight: font.weight }}>{children}</div>
	)
}

interface ICDTBlock {
	size: number,
	style: IBlocks,
	children: ReactNode
}

function CountdownBlock ({ size, style, children }: ICDTBlock)
{
	const boxShadow = (style.shadow.width || style.shadow.width === 0) ? `0 0 ${style.shadow.width} ${style.shadow.color}` : 'none';

	return (
		<div className="the-cdt-block" style={{
			padding: style.padding + 'px',
			backgroundColor: style.background,
			borderStyle: style.border.style,
			borderWidth: style.border.width,
			borderColor: style.border.color,
			borderRadius: style.rounding,
			flexGrow: style.grow,
			aspectRatio: style.aspectRatio,
			boxShadow: boxShadow,
			'--the-cdt-value-size': size } as CSSProperties }>
			{children}
		</div>
	);
}

interface ICDTDelimiter {
	delimiter: ISeparator
}

function CountdownDelimiter ({ delimiter }: ICDTDelimiter)
{
	return (
		<div className="the-cdt-delimiter" style={{ color: delimiter.color, fontSize: delimiter.size, fontWeight: delimiter.weight }}>{delimiter.symbol}</div>
	);
}

interface ICDT {
	config: IConfig
}

export default function CountdownTimer ({ config }: ICDT)
{
	const countdown = useCountdown(config.datetime!, config.timezone!, config.enabledUnits);

	const separators: {
		[key in TUnits]: ReactNode
	} = {
		years: <CountdownDelimiter key='delimiter-for-years' delimiter={ config.daySeparator }/>,
		months: <CountdownDelimiter key='delimiter-for-months' delimiter={ config.daySeparator }/>,
		weeks: <CountdownDelimiter key='delimiter-for-weeks' delimiter={ config.daySeparator }/>,
		days: <CountdownDelimiter key='delimiter-for-days' delimiter={ config.daySeparator }/>,
		hours: <CountdownDelimiter key='delimiter-for-hours' delimiter={ config.timeSeparator }/>,
		minutes: <CountdownDelimiter key='delimiter-for-minutes' delimiter={ config.timeSeparator }/>,
		seconds: undefined
	}

	return (
		<>
		{ (!countdown.expired || config.expiration.visibility === 'keep') && <div className='the-cdt' style={{ gap: config.container.gap + 'px', justifyContent: config.container.alignment }}>
			{
				config.enabledUnits.map((unit) => (
					<>
					<CountdownBlock key={`block-for-${unit}`} size={config.numbersFont.size} style={config.blocks}>
						<CountdownValue font={config.numbersFont}>{countdown[unit].toString().padStart(2, "0")}</CountdownValue>
						<CountdownUnit font={config.unitsFont}>{config.defaultUnits[unit]}</CountdownUnit>
					</CountdownBlock>

					{ unit in separators && separators[unit] }
					</>
				))
			}
			</div>
		}

		{ (countdown.expired && config.expiration.visibility === 'text') && <div className='the-cdt' style={{ gap: config.container.gap + 'px', justifyContent: config.container.alignment }}>
				<CountdownBlock key='block-for-text' size={config.numbersFont.size} style={config.blocks}>
					{ config.expiration.text }
				</CountdownBlock>
			</div>}
		</>
	);
}