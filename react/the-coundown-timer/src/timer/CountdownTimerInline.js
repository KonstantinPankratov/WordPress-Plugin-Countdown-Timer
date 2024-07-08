import { useContext } from 'react';
import { useCountdown } from './hooks/useCountdown';
import { DelimiterContext } from '../blocks/InlineCountdown';

export default function CountdownTimerInline ({ targetDate }) {
	const delimiter = useContext(DelimiterContext);
	const [days, hours, minutes, seconds] = useCountdown(targetDate);

	return (
		<span>
			{days} {delimiter} {hours} {delimiter} {minutes} {delimiter} {seconds}
		</span>
	);
};