import React from 'react';
import { useStores } from 'services/hooks';
import { AttachFile as PaperClipIcon } from '@material-ui/icons';
import CopyToClipboard, {
  Props as CopyToClipboardProps,
} from 'react-copy-to-clipboard';
import {
  Tooltip,
  IconButton,
  createStyles,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    icon: {
      '&:hover': {
        color: palette.primary.main,
      },
    },
  }),
);

export const CopyTableLinkButton = () => {
  const classes = useStyles();
  const { snackbarStore } = useStores();

  const handleClick: CopyToClipboardProps['onCopy'] = (text, result) => {
    if (result) {
      snackbarStore.open('Copied link');
    }
  };

  return (
    <CopyToClipboard text={window.location.href} onCopy={handleClick}>
      <Tooltip title="Copy link to table">
        <IconButton className={classes.icon}>
          <PaperClipIcon />
        </IconButton>
      </Tooltip>
    </CopyToClipboard>
  );
};
