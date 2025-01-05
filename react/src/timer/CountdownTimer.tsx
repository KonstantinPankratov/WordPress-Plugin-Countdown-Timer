import { ReactNode } from 'react';
import useCountdown from './hooks/useCountdown';
import './css/countdownTimer.scss';
import IConfig, { TUnits } from '../types/config';
import CountdownDelimiter from './CountdownDelimiter';
import CountdownBlock from './CountdownBlock';
import CountdownValue from './CountdownValue';
import CountdownUnit from './CountdownUnit';

interface ICDT {
  config: IConfig
}

export default function CountdownTimer({ config }: ICDT) {
  const countdown = useCountdown(config.datetime!, config.timezone!, config.enabledUnits);

  const separators: {
    [key in TUnits]: ReactNode
  } = {
    years: <CountdownDelimiter key='delimiter-for-years' delimiter={config.daySeparator} />,
    months: <CountdownDelimiter key='delimiter-for-months' delimiter={config.daySeparator} />,
    weeks: <CountdownDelimiter key='delimiter-for-weeks' delimiter={config.daySeparator} />,
    days: <CountdownDelimiter key='delimiter-for-days' delimiter={config.daySeparator} />,
    hours: <CountdownDelimiter key='delimiter-for-hours' delimiter={config.timeSeparator} />,
    minutes: <CountdownDelimiter key='delimiter-for-minutes' delimiter={config.timeSeparator} />,
    seconds: undefined
  }

  const showCountDownTimer = !countdown.expired || config.expiration.visibility === 'keep';
  const showExpirationText = countdown.expired && config.expiration.visibility === 'text';

  return (
    <>
      {showCountDownTimer && <div className='the-cdt' style={{ gap: config.container.gap + 'px', justifyContent: config.container.alignment }}>
        {
          config.enabledUnits.map((unit) => (
            <>
              <CountdownBlock key={`block-for-${unit}`} size={config.numbersFont.size} style={config.blocks}>
                <CountdownValue font={config.numbersFont}>{countdown[unit].toString().padStart(2, "0")}</CountdownValue>
                <CountdownUnit font={config.unitsFont}>{config.defaultUnits[unit]}</CountdownUnit>
              </CountdownBlock>

              {unit in separators && separators[unit]}
            </>
          ))
        }
      </div>
      }

      {showExpirationText && <div className='the-cdt' style={{ gap: config.container.gap + 'px', justifyContent: config.container.alignment }}>
        <CountdownBlock key='block-for-text' size={config.numbersFont.size} style={config.blocks}>
          {config.expiration.text}
        </CountdownBlock>
      </div>}
    </>
  );
}