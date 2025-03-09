import '@testing-library/jest-dom/vitest';
import React from 'react';
import { describe, it, expect, vi, afterEach, beforeAll } from 'vitest'
import { act, cleanup, render, screen } from '@testing-library/react';
import CountdownTimer from '../src/timer/CountdownTimer';
import { mergeOrCreateConfig } from '../src/utils/mergeOrCreateConfig';

vi.useFakeTimers().setSystemTime(new Date('2020-01-01T00:00:00'));

const mockConfig = mergeOrCreateConfig({
  datetime: new Date('2020-01-01T01:00:00').toISOString().slice(0, 19),
  enabledUnits: ['weeks', 'days', 'hours', 'minutes', 'seconds'],
  separators: {
    day: {
      symbol: '-'
    }
  }
});

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
      color: mockConfig.fonts.units.color,
      fontFamily: mockConfig.fonts.units.family,
      fontSize: mockConfig.fonts.units.size,
      fontWeight: mockConfig.fonts.units.weight,
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
      color: mockConfig.fonts.numbers.color,
      fontFamily: mockConfig.fonts.numbers.family,
      fontSize: mockConfig.fonts.numbers.size,
      fontWeight: mockConfig.fonts.numbers.weight,
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
      color: mockConfig.separators.time.color,
      fontFamily: mockConfig.separators.time.family,
      fontSize: mockConfig.separators.time.size,
      fontWeight: mockConfig.separators.time.weight,
    });

    expect(screen.getAllByText('-')[0]).toHaveStyle({
      color: mockConfig.separators.day.color,
      fontFamily: mockConfig.separators.day.family,
      fontSize: mockConfig.separators.day.size,
      fontWeight: mockConfig.separators.day.weight,
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