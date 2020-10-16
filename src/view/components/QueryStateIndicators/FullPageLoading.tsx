import React from 'react';
import { Backdrop, makeStyles, createStyles } from '@material-ui/core';
import { QueryResult } from 'react-query';
import { SpinnerWithLabel } from './SpinnerWithLabel';
import {
  LoadingWithMinDisplay,
  LoadingWithMinDisplayProps,
} from './LoadingWithMinDisplay';
import { WarningIconError } from './WarningIconError';

export interface FullPageLoadingProps<T extends QueryResult<any>> {
  /**
   * **Default**: _"Failed to load"_
   *
   * Error text that is passed to the `<WarningIconError />`
   */
  errorLabel?: string;
  /**
   * **Default**: _"Loading..."_
   *
   * Loading text that is passed to the `<SpinnerWithLabel />`
   */
  loadingLabel?: string;
  queryRes: LoadingWithMinDisplayProps<T>['queryRes'];
  children: LoadingWithMinDisplayProps<T>['children'];
}

const useStyles = makeStyles(({ zIndex }) =>
  createStyles({
    backdrop: {
      zIndex: zIndex.drawer + 1,
      color: '#fff',
    },
    centered: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translateY(-50%)',
    },
  }),
);

/**
 * Wrapper for `<LoadingWithMinDisplay />` to render a generic full
 * screen loading process.
 *
 * While loading, a spinner with a label is displayed over a backdrop.
 *
 * If an error occurs, a `<WarningIconError />` component is rendered.
 */
export const FullPageLoading = <T extends QueryResult<any>>({
  children,
  loadingLabel = 'Loading...',
  errorLabel = 'Failed to load',
  queryRes,
}: FullPageLoadingProps<T>) => {
  const classes = useStyles();

  return (
    <LoadingWithMinDisplay
      queryRes={queryRes}
      errorIndicator={
        <div className={classes.centered}>
          <WarningIconError size="large">{errorLabel}</WarningIconError>
        </div>
      }
      loadingIndicator={
        <Backdrop open className={classes.backdrop}>
          <SpinnerWithLabel>{loadingLabel}</SpinnerWithLabel>
        </Backdrop>
      }
    >
      {children}
    </LoadingWithMinDisplay>
  );
};
