import React, { useState } from 'react';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUserOutlined';
import IconButton from '@material-ui/core/IconButton';
import { SvgIconTypeMap } from '@material-ui/core/SvgIcon';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ClaimedDialog } from 'view/dialogs';

export interface ClaimedIconButtonProps {
  size?: SvgIconTypeMap['props']['fontSize'];
}

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    icon: {
      color: palette.success.main,
    },
  }),
);

export function ClaimedIconButton({ size }: ClaimedIconButtonProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const classes = useStyles();

  return (
    <div>
      <Tooltip title="Claimed Data">
        <IconButton
          aria-label="claimed-icon"
          onClick={() => setDialogIsOpen(true)}
        >
          <VerifiedUserIcon
            className={classes.icon}
            fontSize={size || 'default'}
          />
        </IconButton>
      </Tooltip>
      <ClaimedDialog
        open={dialogIsOpen}
        handleClose={() => setDialogIsOpen(false)}
      />
    </div>
  );
}
