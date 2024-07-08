import { createRoot } from 'react-dom/client';
import CountdownTimer from './timer/CountdownTimer';
import CountdownTimerEditor from './wordpress/CountdownTimerEditor';

document.addEventListener('DOMContentLoaded', function () {
    const containers = document.querySelectorAll('.the-countdown-timer-component');

    containers.forEach(container => {
        const { delimiter, date } = container.dataset;
        const root = createRoot(container);
        root.render(<CountdownTimer delimiter={delimiter} targetDate={date} />);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const containers = document.querySelectorAll('.the-countdown-timer-editor-component');

    containers.forEach(container => {
        const { delimiter, date } = container.dataset;
        const root = createRoot(container);
        root.render(<CountdownTimerEditor delimiter={delimiter} targetDate={date} />);
    });
});