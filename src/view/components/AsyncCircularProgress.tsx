/* eslint-disable react/jsx-props-no-spreading */

import React, { useEffect, useState, FC } from 'react';
import { CircularProgress, CircularProgressProps } from '@material-ui/core';

export interface AsyncCircularProgressProps extends CircularProgressProps {
  /**
   * **Default value**: 750
   *
   * Minimum number of milliseconds to display the progress animation for.
   * Note that the timer will only begin once wait timer has expired.
   *
   */
  minDisplayTimeMs?: number;
  /**
   * **Default value**: 250
   *
   * Number of milliseconds to wait before displaying the progress animation.
   * Can be used to prevent the animation from displaying if loading completes
   * quickly.
   */
  waitTimeMs?: number;
  isLoading: boolean;
}

/**
 * Wraps the Material UI <CircularProgress /> element
 * with a `minDisplayTimeMs` and `waitTimeMs` props to
 * prevent the progress indicator from flashing on/off
 * screen too quickly.
 *
 * Elements passed as children will not be rendered until both
 * loading is complete, and the timer is no longer active.
 */
export const AsyncCircularProgress: FC<AsyncCircularProgressProps> = ({
  minDisplayTimeMs = 750,
  waitTimeMs = 250,
  isLoading,
  children,
  ...props
}) => {
  const [displayTimerActive, setDisplayTimerActive] = useState(false);
  const [waitTimerActive, setWaitTimerActive] = useState(true);

  const setWaitTimeout = () => {
    setTimeout(() => {
      setWaitTimerActive(false);
      setDisplayTimerActive(true);
    }, waitTimeMs);
  };

  const setDisplayTimeout = () => {
    setTimeout(
      () => setDisplayTimerActive(false),
      minDisplayTimeMs + waitTimeMs,
    );
  };

  useEffect(() => {
    setWaitTimeout();
    setDisplayTimeout();
  }, []);

  if (waitTimerActive) {
    return null;
  }

  return displayTimerActive || isLoading ? (
    <CircularProgress {...props} />
  ) : (
    <>{children}</>
  );
};
