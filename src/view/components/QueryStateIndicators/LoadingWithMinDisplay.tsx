import React, { useEffect, useState, useRef } from 'react';
import { CircularProgress } from '@material-ui/core';
import { QueryResult } from 'react-query';
import { WarningIconError } from './WarningIconError';

export interface LoadingWithMinDisplayProps<
  T extends QueryResult<any['data']>
> {
  /**
   * **Default value**: _750_
   *
   * Minimum number of milliseconds to display the loading animation for.
   * Note that the timer will only begin once the wait timer has expired.
   *
   */
  minDisplayTimeMs?: number;
  /**
   * **Default value**: _250_
   *
   * Number of milliseconds to wait before displaying the loading animation.
   * Used to prevent the loading animation from flashing on screen very briefly
   * if loading completes in less than `waitTimeMs` milliseconds.
   */
  waitTimeMs?: number;
  /**
   * **Default value**: _<CircularProgress />_
   *
   * React node that will be displayed while either `isLoading` is true,
   * or the elapsed time between `waitTimeMs` and `minDisplayTimeMs` has
   * not passed.
   */
  loadingIndicator?: React.ReactNode;
  /**
   * **Default value**: _<WarningIconError />_
   *
   * React node that will be displayed if an error object
   * is present on `queryRes`.
   */
  errorIndicator?: React.ReactNode;
  /**
   * Query response from a call to `useQuery`
   */
  queryRes: T;
  children:
    | ((resData: Exclude<T['data'], undefined>) => React.ReactNode)
    | React.ReactNode;
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
 *
 */
export const LoadingWithMinDisplay = <T extends QueryResult<any['data']>>({
  minDisplayTimeMs = 750,
  waitTimeMs = 250,
  loadingIndicator = CircularProgress,
  errorIndicator = WarningIconError,
  queryRes,
  children,
}: LoadingWithMinDisplayProps<T>) => {
  const loadingRef = useRef(queryRes.isLoading);
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
    loadingRef.current = queryRes.isLoading;
    setWaitTimeout();
    setDisplayTimeout();
  }, [queryRes.isLoading]);

  if (waitTimerActive) {
    return null;
  }

  if (queryRes.error) {
    return <>{errorIndicator}</>;
  }

  if (displayTimerActive) {
    return <>{loadingIndicator}</>;
  }

  return typeof children === 'function' && queryRes.data !== undefined ? (
    children(queryRes.data)
  ) : (
    <>{children}</>
  );
};
