import { useEffect, useState } from 'react';

const useCountdown = (targetDate) => {
	const countdowndate = new Date(targetDate).getTime();

	const [countdown, setCountdown] = useState(
		countdowndate - new Date().getTime()
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setCountdown(countdowndate - new Date().getTime());
		}, 1000);

		return () => clearInterval(interval);
	}, [countdowndate, targetDate]);

	return getReturnValues(countdown);
};

const getReturnValues = (countdown) =>
{
	if (countdown < 0) {
        return { years: 0, months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

	const years = Math.floor(countdown / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((countdown % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const weeks = Math.floor(((countdown % (1000 * 60 * 60 * 24 * 365)) % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24 * 7));
	const days = Math.max(Math.floor(countdown / (1000 * 60 * 60 * 24)), 0);
	const hours = Math.max(Math.floor((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), 0);
	const minutes = Math.max(Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60)), 0);
	const seconds = Math.max(Math.floor((countdown % (1000 * 60)) / 1000), 0);

	return {years, months, weeks, days, hours, minutes, seconds};
};

export { useCountdown };
