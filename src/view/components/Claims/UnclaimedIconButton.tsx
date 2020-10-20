import React, { useState } from 'react';
import { InfoOutlined as InfoIcon } from '@material-ui/icons';
import {
  Tooltip,
  IconButton,
  SvgIconProps,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import { UnclaimedDialog } from 'view/modals';

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    icon: {
      color: palette.info.main,
    },
  }),
);

export function UnclaimedIconButton(props?: SvgIconProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const classes = useStyles();

  return (
    <div>
      <Tooltip title="Unclaimed Data">
        <IconButton
          aria-label="unclaimed-icon"
          onClick={() => setDialogIsOpen(true)}
        >
          <InfoIcon className={classes.icon} {...props} />
        </IconButton>
      </Tooltip>
      <UnclaimedDialog
        open={dialogIsOpen}
        handleClose={() => setDialogIsOpen(false)}
      />
    </div>
  );
}
