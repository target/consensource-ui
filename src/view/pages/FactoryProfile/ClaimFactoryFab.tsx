import React from 'react';
import {
  Fab,
  createStyles,
  WithStyles,
  withStyles,
  Theme,
} from '@material-ui/core';
import { VerifiedUserOutlined } from '@material-ui/icons';
import { FactoryResData } from 'services/api';
import { TransferFactoryDialog } from 'view/modals';
import { useAuth } from 'services/hooks';

const styles = (theme: Theme) =>
  createStyles({
    closeButton: {
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed',
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  });

export interface ClaimFactoryFabProps extends WithStyles<typeof styles> {
  factory: FactoryResData;
}

export const ClaimFactoryFab = withStyles(styles)(
  ({ factory, classes }: ClaimFactoryFabProps) => {
    const { signer } = useAuth();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    return (
      <>
        <Fab
          color="secondary"
          variant="extended"
          aria-label="claim"
          className={classes.closeButton}
          onClick={handleOpen}
          disabled={!signer}
        >
          <VerifiedUserOutlined className={classes.extendedIcon} />
          Claim this factory
        </Fab>

        <TransferFactoryDialog
          open={open}
          handleClose={handleClose}
          factory={factory}
        />
      </>
    );
  },
);
