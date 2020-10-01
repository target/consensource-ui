import React from 'react';
import { Backdrop, makeStyles, createStyles } from '@material-ui/core';
import { QueryResult } from 'react-query';
import { SpinnerWithLabel } from './SpinnerWithLabel';
import {
  LoadingWithMinDisplay,
  LoadingWithMinDisplayProps,
} from './LoadingWithMinDisplay';
import { WarningIconError } from './WarningIconError';

export interface FullPageLoadingProps<T extends QueryResult<any['data']>> {
  errorLabel: string;
  loadingLabel: string;
  queryRes: LoadingWithMinDisplayProps<T>['queryRes'];
  children: LoadingWithMinDisplayProps<T>['children'];
}

const useStyles = makeStyles((theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

export const FullPageLoading = <T extends QueryResult<any['data']>>({
  children,
  loadingLabel,
  errorLabel,
  queryRes,
}: FullPageLoadingProps<T>) => {
  const classes = useStyles();

  return (
    <LoadingWithMinDisplay
      queryRes={queryRes}
      errorIndicator={
        <WarningIconError size="large">{errorLabel}</WarningIconError>
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
