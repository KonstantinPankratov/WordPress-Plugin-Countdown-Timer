import { describe, it, expect, toEqual, objectContaining, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react';
import { DateTime } from 'luxon';
import useCountdown, { getRemainingTime } from '../src/timer/hooks/useCountdown';

vi.useFakeTimers();

describe('Basics: getRemainingTime', () => {
  it('returns the correct remaining time for a FUTURE date', async () => {
    const futureDate = DateTime.now().plus({ hours: 2 }).toISO();
    const timezone = 'UTC';
    const units = ['hours', 'minutes', 'seconds'];

    const result = getRemainingTime(futureDate, timezone, units);

    expect(result).toEqual(
      expect.objectContaining({
        hours: 2,
        minutes: 0,
        seconds: 0,
        expired: false,
      })
    );
  });

  it('returns the correct remaining time for a PAST date', () => {
    const pastDate = DateTime.now().minus({ hours: 1 }).toISO();
    const timezone = 'UTC';
    const units = ['hours', 'minutes', 'seconds'];

    const result = getRemainingTime(pastDate, timezone, units);

    expect(result).toEqual(
      expect.objectContaining({
        hours: 0,
        minutes: 0,
        seconds: 0,
        expired: true,
      })
    );
  });
});

describe('Basics: useCountdown', () => {
  it('returns the correct counted down time for a FUTURE date', async () => {
    const futureDate = DateTime.now().plus({ minutes: 5 }).toISO();
    const timezone = 'UTC';
    const units = ['minutes', 'seconds'];

    const { result } = renderHook(() =>
      useCountdown(futureDate, timezone, units)
    );

    expect(result.current).toEqual(
      expect.objectContaining({
        minutes: 5,
        seconds: 0,
        expired: false,
      })
    );
  });

  it('updates remaining time at regular intervals', () => {
    const futureDate = DateTime.now().plus({ seconds: 10 }).toISO();
    const timezone = 'UTC';
    const units = ['seconds'];

    const { result } = renderHook(() =>
      useCountdown(futureDate, timezone, units)
    );

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(5000); // Simulate 5 seconds passing
    });

    expect(result.current).toEqual(
      expect.objectContaining({
        seconds: 5,
        expired: false,
      })
    );

    act(() => {
      vi.advanceTimersByTime(5000); // Simulate another 5 seconds passing
    });

    expect(result.current).toEqual(
      expect.objectContaining({
        seconds: 0,
        expired: true,
      })
    );
  });

  it('cleans up the interval on unmount', () => {
    const futureDate = DateTime.now().plus({ minutes: 1 }).toISO();
    const timezone = 'UTC';
    const units = ['minutes', 'seconds'];

    vi.spyOn(global, 'clearInterval');

    const { unmount } = renderHook(() =>
      useCountdown(futureDate, timezone, units)
    );

    unmount();

    expect(clearInterval).toHaveBeenCalledTimes(1);
  });
});