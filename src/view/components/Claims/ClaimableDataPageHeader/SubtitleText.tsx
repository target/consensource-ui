import React, { FC } from 'react';
import { Typography } from '@material-ui/core';

/**
 * Formatted `<Typography>` used as the subtitle for
 * `<ClaimableDataPageHeader />`
 */
export const SubtitleText: FC = ({ children }) => {
  return (
    <Typography align="center" color="textSecondary">
      {children}
    </Typography>
  );
};
