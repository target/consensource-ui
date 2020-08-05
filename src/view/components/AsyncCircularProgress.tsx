/* eslint-disable react/jsx-props-no-spreading */

import React, { useEffect, useState, FC } from 'react';
import { CircularProgress, CircularProgressProps } from '@material-ui/core';

export interface AsyncCircularProgressProps extends CircularProgressProps {
  minDisplayTimeMs?: number;
  isLoading: boolean;
}

/**
 * Wraps the Material UI <CircularProgress /> element
 * with a `minDisplayTimeMs` to prevent the progress indicator
 * from flashing on/off screen too quickly.
 *
 * Elements passed as children will not be rendered until both
 * loading is complete, and the timer is no longer active.
 */
export const AsyncCircularProgress: FC<AsyncCircularProgressProps> = ({
  minDisplayTimeMs = 0,
  isLoading,
  children,
  ...props
}) => {
  const [isTimerActive, setTimerIsActive] = useState(true);

  useEffect(() => {
    setTimeout(() => setTimerIsActive(false), minDisplayTimeMs);
  }, []);

  return isTimerActive || isLoading ? (
    <CircularProgress {...props} />
  ) : (
    <>{children}</>
  );
};
