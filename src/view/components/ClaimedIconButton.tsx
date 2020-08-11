import React, { useState } from 'react';
import { VerifiedUserOutlined } from '@material-ui/icons';
import { Tooltip, IconButton, SvgIconProps } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ClaimedDialog } from 'view/dialogs';

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    icon: {
      color: palette.success.main,
    },
  }),
);

export function ClaimedIconButton(props: SvgIconProps) {
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
