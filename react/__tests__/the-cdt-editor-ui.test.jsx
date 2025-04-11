import '@testing-library/jest-dom/vitest';
import React from 'react';
import { describe, it, expect, vi, afterEach, beforeAll } from 'vitest'
import { cleanup, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../src/store';
import CountdownTimerEditor from '../src/wordpress/CountdownTimerEditor';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
});

afterEach(() => {
  cleanup();
});

describe('The CDT EDITOR UI', () => {
  it('No config, default layout', async () => {
    const renderedEditor = render(
      <Provider store={store}>
        <CountdownTimerEditor />
      </Provider>
    );

    expect(renderedEditor.container.querySelectorAll('.components-tab-panel__tabs button').length).toBe(7);
  });
});