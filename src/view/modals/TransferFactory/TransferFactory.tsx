import React from 'react';
import {
  DialogTitle,
  Dialog,
  DialogContent,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { useBatchStatus } from 'services/hooks';
import { FactoryResData } from 'services/api';
import { UpdateOrganizationForm } from 'view/forms/organization';
import { DialogProps } from '../utils';
import { Header } from './Header';

export interface TransferFactoryDialogProps extends DialogProps {
  factory: FactoryResData;
}

const useStyles = makeStyles(({ spacing }) =>
  createStyles({
    container: {
      padding: `${spacing(1)}px ${spacing(5)}px ${spacing(3)}px ${spacing(
        5,
      )}px`,
    },
  }),
);

export const TransferFactoryDialog = ({
  open,
  handleClose,
  factory,
}: TransferFactoryDialogProps) => {
  const classes = useStyles();
  const { setBatchStatusLink } = useBatchStatus();

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="transfer-factory-title"
      scroll="body"
      fullWidth
      maxWidth="md"
      open={open}
    >
      <DialogTitle>
        <Header handleClose={handleClose} />
      </DialogTitle>
      <DialogContent classes={{ root: classes.container }}>
        <UpdateOrganizationForm
          existingOrg={factory}
          setBatchStatusLink={setBatchStatusLink}
        />
      </DialogContent>
    </Dialog>
  );
};
