import React, { FC } from 'react';
import { Backdrop, makeStyles, createStyles } from '@material-ui/core';
import { SpinnerWithLabel } from './SpinnerWithLabel';
import { LoadingWithMinDisplay } from './LoadingWithMinDisplay';
import { WarningIconError } from './WarningIconError';

export interface FullPageLoadingProps {
  errorLabel: string;
  loadingLabel: string;
  queryRes: any;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

export const FullPageLoading: FC<FullPageLoadingProps> = ({
  children,
  loadingLabel,
  errorLabel,
  queryRes,
}) => {
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
