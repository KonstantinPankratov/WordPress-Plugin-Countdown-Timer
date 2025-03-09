import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import CountdownTimerEditor from './wordpress/CountdownTimerEditor';
import store from "./store";

document.addEventListener('DOMContentLoaded', function () {
  const containers = document.querySelectorAll('.the-countdown-timer-editor-component');

  containers.forEach(container => {
    const root = createRoot(container);
    root.render(
      <Provider store={store}>
        <CountdownTimerEditor />
      </Provider>
    );
  });
});