import React, { useEffect, useState, useRef, FC } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { FullScreenSpinnerSize } from './utils';

export interface LoadingWithMinDisplayProps {
  /**
   * **Default value**: 750
   *
   * Minimum number of milliseconds to display the loading animation for.
   * Note that the timer will only begin once the wait timer has expired.
   *
   */
  minDisplayTimeMs?: number;
  /**
   * **Default value**: 250
   *
   * Number of milliseconds to wait before displaying the loading animation.
   * Used to prevent the loading animation from flashing on screen very briefly
   * if loading completes in less than `waitTimeMs` milliseconds.
   */
  waitTimeMs?: number;
  /**
   * **Default value**: <LoadingSpinner size={FullScreenSpinnerSize} />
   *
   * React node that will be displayed while either `isLoading` is true,
   * or the elapsed time between `waitTimeMs` and `minDisplayTimeMs` has
   * not passed.
   */
  loadingIndicator?: React.ReactNode;
  isLoading: boolean;
}

/**
 * Wraps children with a `minDisplayTimeMs` and `waitTimeMs` props
 * to prevent the loading indicator from flashing on/off screen
 * too quickly.
 *
 * Elements passed as children will not be rendered until both
 * loading is complete, and the timer is no longer active.
 *
 * If loading is completed before the `waitTimeMs` timeout is complete,
 * then no loading indicator will be displayed.
 */
export const LoadingWithMinDisplay: FC<LoadingWithMinDisplayProps> = ({
  minDisplayTimeMs = 750,
  waitTimeMs = 250,
  loadingIndicator = <LoadingSpinner size={FullScreenSpinnerSize} />,
  isLoading,
  children,
}) => {
  const loadingRef = useRef(isLoading);
  const [displayTimerActive, setDisplayTimerActive] = useState(false);
  const [waitTimerActive, setWaitTimerActive] = useState(true);

  const setWaitTimeout = () => {
    setTimeout(() => {
      setWaitTimerActive(false);
      if (loadingRef.current) {
        setDisplayTimerActive(true);
      }
    }, waitTimeMs);
  };

  const setDisplayTimeout = () => {
    setTimeout(() => {
      if (displayTimerActive) {
        setDisplayTimerActive(false);
      }
    }, minDisplayTimeMs + waitTimeMs);
  };

  useEffect(() => {
    loadingRef.current = isLoading;
    setWaitTimeout();
    setDisplayTimeout();
  }, [isLoading]);

  if (waitTimerActive) {
    return null;
  }

  return <>{displayTimerActive ? loadingIndicator : children}</>;
};
