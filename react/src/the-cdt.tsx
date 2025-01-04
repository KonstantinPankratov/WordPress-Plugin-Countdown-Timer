import { createRoot } from 'react-dom/client';
import CountdownTimer from './timer/CountdownTimer';

document.addEventListener('DOMContentLoaded', function () {
  const containers = document.querySelectorAll('.the-countdown-timer-component');

  containers.forEach(container => {
    const root = createRoot(container);
    const config = container.getAttribute('data-config');
    if (config !== null) {
      root.render(<CountdownTimer config={JSON.parse(config)} />);
    }
  });
});