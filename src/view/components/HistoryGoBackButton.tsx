import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';

export interface HistoryGoBackButtonProps {
  tooltipTitle?: string;
}

export const HistoryGoBackButton = ({
  tooltipTitle = '',
}: HistoryGoBackButtonProps) => {
  const { state } = useLocation();
  const history = useHistory();

  if (!state || !state.from) {
    return null;
  }

  return (
    <Tooltip title={tooltipTitle}>
      <IconButton aria-label="back-arrow-icon" onClick={() => history.goBack()}>
        <ArrowBackIcon />
      </IconButton>
    </Tooltip>
  );
};
