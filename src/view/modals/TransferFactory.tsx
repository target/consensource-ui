import React from 'react';
import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  IconButton,
  Grid,
  Typography,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { useBatchStatus } from 'services/hooks';
import { FactoryResData } from 'services/api';
import { UpdateOrganizationForm } from 'view/forms/organization';
import { DialogProps } from './utils';

export interface TransferFactoryDialogProps extends DialogProps {
  factory: FactoryResData;
}

export const TransferFactoryDialog = ({
  open,
  handleClose,
  factory,
}: TransferFactoryDialogProps) => {
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
        <Grid container justify="space-between">
          <Typography variant="h2">Confirm Factory Information</Typography>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Claim this factory to manage address info, contact info, and more.
        </DialogContentText>
        <UpdateOrganizationForm
          existingOrg={factory}
          setBatchStatusLink={setBatchStatusLink}
        />
      </DialogContent>
    </Dialog>
  );
};
