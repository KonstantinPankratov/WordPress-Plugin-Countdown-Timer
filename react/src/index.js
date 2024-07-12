import { createRoot } from 'react-dom/client';
import CountdownTimer from './timer/CountdownTimer';
import CountdownTimerEditor from './wordpress/CountdownTimerEditor';

document.addEventListener('DOMContentLoaded', function () {
    const containers = document.querySelectorAll('.the-countdown-timer-component');

    containers.forEach(container => {
        const root = createRoot(container);
        const config = JSON.parse(container.getAttribute('data-config'));
        root.render(<CountdownTimer config={config}/>);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const containers = document.querySelectorAll('.the-countdown-timer-editor-component');

    containers.forEach(container => {
        const root = createRoot(container);
        root.render(<CountdownTimerEditor />);
    });
});