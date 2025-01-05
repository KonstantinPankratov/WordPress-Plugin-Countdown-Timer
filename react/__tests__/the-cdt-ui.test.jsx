import '@testing-library/jest-dom/vitest';
import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest'
import { act, cleanup, render, screen } from '@testing-library/react';
import CountdownTimer from '../src/timer/CountdownTimer';
import { DateTime } from 'luxon';

vi.useFakeTimers();

const mockConfig = {
  datetime: DateTime.now().plus({ hours: 1 }).toISO(),
  timezone: 'UTC',
  enabledUnits: ['weeks', 'days', 'hours', 'minutes', 'seconds'],
  daySeparator: { symbol: '-', color: 'gray', size: '16px', weight: 'normal' },
  timeSeparator: { symbol: ':', color: 'black', size: '16px', weight: 'bold' },
  numbersFont: { color: 'black', family: 'Arial', size: '24px', weight: 'bold' },
  unitsFont: { color: 'gray', family: 'Verdana', size: '16px', weight: 'normal' },
  blocks: {
    padding: 10,
    background: 'white',
    border: { style: 'solid', width: '1px', color: 'black' },
    rounding: '5px',
    grow: 1,
    aspectRatio: '1',
    shadow: { width: '5px', color: 'rgba(0,0,0,0.2)' },
  },
  container: { gap: 10, alignment: 'center' },
  defaultUnits: {
    weeks: 'Weeks',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
  },
  expiration: { visibility: 'keep' },
};

afterEach(() => {
  cleanup();
});

describe('The CDT UI: UNIT', () => {
  it('Renders correctly', async () => {
    render(<CountdownTimer config={mockConfig} />);

    expect(screen.getByText('Weeks')).toBeInTheDocument();
    expect(screen.getByText('Days')).toBeInTheDocument();
    expect(screen.getByText('Hours')).toBeInTheDocument();
    expect(screen.getByText('Minutes')).toBeInTheDocument();
    expect(screen.getByText('Seconds')).toBeInTheDocument();
  });

  it('Style renders correctly', async () => {
    render(<CountdownTimer config={mockConfig} />);

    expect(screen.getByText('Weeks')).toHaveStyle({
      color: mockConfig.unitsFont.color,
      fontFamily: mockConfig.unitsFont.family,
      fontSize: mockConfig.unitsFont.size,
      fontWeight: mockConfig.unitsFont.weight,
    });
  });
});


describe('The CDT UI: VALUE', () => {

  it('Renders correctly', async () => {
    render(<CountdownTimer config={mockConfig} />);

    expect(screen.getAllByText('01')).toHaveLength(1);
    expect(screen.getAllByText('00')).toHaveLength(4);
  });

  it('Style renders correctly', async () => {
    render(<CountdownTimer config={mockConfig} />);

    expect(screen.getByText('01')).toHaveStyle({
      color: mockConfig.numbersFont.color,
      fontFamily: mockConfig.numbersFont.family,
      fontSize: mockConfig.numbersFont.size,
      fontWeight: mockConfig.numbersFont.weight,
    });
  });
});

describe('The CDT UI: SEPARATORS', () => {
  it('Renders correctly', async () => {
    render(<CountdownTimer config={mockConfig} />);

    expect(screen.getAllByText(':')).toHaveLength(2);
    expect(screen.getAllByText('-')).toHaveLength(2);
  });

  it('Style renders correctly', async () => {
    render(<CountdownTimer config={mockConfig} />);

    expect(screen.getAllByText(':')[0]).toHaveStyle({
      color: mockConfig.timeSeparator.color,
      fontFamily: mockConfig.timeSeparator.family,
      fontSize: mockConfig.timeSeparator.size,
      fontWeight: mockConfig.timeSeparator.weight,
    });

    expect(screen.getAllByText('-')[0]).toHaveStyle({
      color: mockConfig.daySeparator.color,
      fontFamily: mockConfig.daySeparator.family,
      fontSize: mockConfig.daySeparator.size,
      fontWeight: mockConfig.daySeparator.weight,
    });
  });
});

describe('The CDT UI: EXPIRED', () => {
  it('Visibility: keep', async () => {
    rewindTimerUntilExpires();

    render(<CountdownTimer config={mockConfig} />);

    expect(screen.getAllByText('00')).toHaveLength(5);
  });

  it('Visibility: text', async () => {
    const expiredConfig = {
      ...mockConfig,
      expiration: { visibility: 'text', text: 'Expired' },
    };

    rewindTimerUntilExpires();

    render(<CountdownTimer config={expiredConfig} />);

    expect(screen.getByText('Expired')).toBeVisible();
    expect(screen.queryByText('00')).toBeNull();
  });

  it('Visibility: hide', async () => {
    const expiredConfig = {
      ...mockConfig,
      expiration: { visibility: 'hide', text: 'Expired' },
    };

    rewindTimerUntilExpires();

    render(<CountdownTimer config={expiredConfig} />);

    expect(screen.queryByText('Expired')).toBeNull();
  });
});

function rewindTimerUntilExpires() {
  act(() => {
    vi.advanceTimersByTime(1000 * 60 * 60);
  });
}