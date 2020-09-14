import React, { FC } from 'react';
import {
  Grid,
  Typography,
  SvgIconProps,
  TypographyProps,
} from '@material-ui/core';
import { Warning as WarningIcon } from '@material-ui/icons';

export interface WarningIconErrorProps {
  /**
   * **Default:** _"large"_
   */
  iconFontSize?: SvgIconProps['fontSize'];
  /**
   * **Default:** _"h5"_
   */
  typeVariant?: TypographyProps['variant'];
}

export const WarningIconError: FC<WarningIconErrorProps> = ({
  children,
  iconFontSize = 'inherit',
  typeVariant = 'body1',
}) => {
  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item xs={12}>
        <WarningIcon fontSize={iconFontSize} color="error" />
      </Grid>
      <Grid item xs={12}>
        <Typography variant={typeVariant} color="error">
          {children}
        </Typography>
      </Grid>
    </Grid>
  );
};
