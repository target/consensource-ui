import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

export interface GoBackButtonProps {
  tooltipLabel?: string;
}

export const GoBackButton = ({ tooltipLabel = '' }: GoBackButtonProps) => {
  const history = useHistory();

  return (
    <Tooltip title={tooltipLabel}>
      <IconButton aria-label="back-arrow-icon" onClick={() => history.goBack()}>
        <ArrowBackIcon />
      </IconButton>
    </Tooltip>
  );
};
