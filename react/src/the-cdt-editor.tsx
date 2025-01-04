import { createRoot } from 'react-dom/client';
import CountdownTimerEditor from './wordpress/CountdownTimerEditor';

document.addEventListener('DOMContentLoaded', function () {
  const containers = document.querySelectorAll('.the-countdown-timer-editor-component');

  containers.forEach(container => {
    const root = createRoot(container);
    root.render(<CountdownTimerEditor />);
  });
});