import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { TUnits } from '../../types/config';

const useCountdown = (datetime: string, timezone: string, units: TUnits[]) => {
	const [remainingTime, setRemainingTime] = useState(getRemainingTime(datetime, timezone, units));

	useEffect(() => {
		const interval = setInterval(() => {
			setRemainingTime(getRemainingTime(datetime, timezone, units));
		}, 1000);

		return () => clearInterval(interval);
	}, [datetime, timezone, units]);
  
	return remainingTime;
};

function getRemainingTime(datetime: string, timezone: string, units: TUnits[]) {
	const targetTime = DateTime.fromISO(datetime, { zone: timezone });
	const now = DateTime.now().setZone(timezone);
	const diff = targetTime.diff(now, units);

	if (diff.toMillis() <= 0) {
		return {
			years: 0,
			months: 0,
			weeks: 0,
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
			expired: true
		}
	}

	return {
		years: diff.years,
		months: diff.months,
		weeks: diff.weeks,
		days: diff.days,
		hours: diff.hours,
		minutes: diff.minutes,
		seconds: Math.floor(diff.seconds),
		expired: false
	}
}

export default useCountdown;
