import React, { useState } from 'react';
import { VerifiedUserOutlined } from '@material-ui/icons';
import {
  Tooltip,
  IconButton,
  SvgIconProps,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import { ClaimedDialog } from 'view/modals';

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    icon: {
      color: palette.success.main,
    },
  }),
);

export const CLAIMED_ICON_BTN_WIDTH = 82.5;

export function ClaimedIconButton(props?: SvgIconProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const classes = useStyles();

  return (
    <div>
      <Tooltip title="Claimed Data">
        <IconButton
          aria-label="claimed-icon"
          onClick={() => setDialogIsOpen(true)}
        >
          <VerifiedUserOutlined className={classes.icon} {...props} />
        </IconButton>
      </Tooltip>
      <ClaimedDialog
        open={dialogIsOpen}
        handleClose={() => setDialogIsOpen(false)}
      />
    </div>
  );
}
