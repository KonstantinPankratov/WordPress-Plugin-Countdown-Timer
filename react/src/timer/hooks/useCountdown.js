import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

const useCountdown = (datetime, timezone) => {
	const [remainingTime, setRemainingTime] = useState(getRemainingTime());

	useEffect(() => {
		const interval = setInterval(() => {
			setRemainingTime(getRemainingTime());
		}, 1000);

		return () => clearInterval(interval);
	}, [datetime, timezone]);
  
	function getRemainingTime() {
		const targetTime = DateTime.fromISO(datetime, { zone: timezone });
		const now = DateTime.now().setZone(timezone);
		const diff = targetTime.diff(now, ['days', 'hours', 'minutes', 'seconds']);

		if (diff.toMillis() <= 0) {
			return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
		}
	
		return {
			days: diff.days,
			hours: diff.hours,
			minutes: diff.minutes,
			seconds: Math.floor(diff.seconds),
			expired: false
		}
	}

	return remainingTime;
};

export { useCountdown };
