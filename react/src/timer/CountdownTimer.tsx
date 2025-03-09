import { Fragment, ReactNode } from 'react';
import useCountdown from './hooks/useCountdown';
import './css/countdownTimer.scss';
import CountdownDelimiter from './CountdownDelimiter';
import CountdownBlock from './CountdownBlock';
import CountdownValue from './CountdownValue';
import CountdownUnit from './CountdownUnit';
import { CountdownConfig } from '../types/schemas/config.s';
import { ValidUnits } from '../types/schemas/units.s';

interface ICDT {
  config: CountdownConfig
}

export default function CountdownTimer({ config }: ICDT) {
  const countdown = useCountdown(config.datetime!, config.timezone!, config.enabledUnits);

  const separators: {
    [key in ValidUnits]: ReactNode
  } = {
    years: <CountdownDelimiter key='delimiter-for-years' delimiter={config.separators.day} />,
    months: <CountdownDelimiter key='delimiter-for-months' delimiter={config.separators.day} />,
    weeks: <CountdownDelimiter key='delimiter-for-weeks' delimiter={config.separators.day} />,
    days: <CountdownDelimiter key='delimiter-for-days' delimiter={config.separators.day} />,
    hours: <CountdownDelimiter key='delimiter-for-hours' delimiter={config.separators.time} />,
    minutes: <CountdownDelimiter key='delimiter-for-minutes' delimiter={config.separators.time} />,
    seconds: <div key='delimiter-for-seconds'></div>
  }

  const showCountDownTimer = !countdown.expired || config.expiration.visibility === 'keep';
  const showExpirationText = countdown.expired && config.expiration.visibility === 'text';

  return (
    <>
      {showCountDownTimer && <div className='the-cdt' style={{ gap: config.container.gap + 'px', justifyContent: config.container.alignment }}>
        {
          config.enabledUnits.map((unit) => (
            <Fragment key={unit}>
              <CountdownBlock key={`block-for-${unit}`} size={config.fonts.numbers.size} style={config.blocks}>
                <CountdownValue font={config.fonts.numbers}>{countdown[unit].toString().padStart(2, "0")}</CountdownValue>
                <CountdownUnit font={config.fonts.units}>{config.defaultUnits[unit]}</CountdownUnit>
              </CountdownBlock>

              {unit in separators && separators[unit]}
            </Fragment>
          ))
        }
      </div>
      }

      {showExpirationText && <div className='the-cdt' style={{ gap: config.container.gap + 'px', justifyContent: config.container.alignment }}>
        <CountdownBlock key='block-for-text' size={config.fonts.numbers.size} style={config.blocks}>
          {config.expiration.text}
        </CountdownBlock>
      </div>}
    </>
  );
}