import React from 'react';
import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import { useBatchStatus } from 'services/hooks';
import { UpdateOrganizationForm } from 'view/forms/organization';
import { OrgDialogProps } from './utils';

export const TransferFactoryDialog = ({
  open,
  handleClose,
  existing_org,
}: OrgDialogProps) => {
  const { batchStatus, setBatchStatusLink } = useBatchStatus();

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="transfer-factory-title"
      open={open}
    >
      <DialogTitle>Transfer Factory</DialogTitle>
      <DialogContent>
        <DialogContentText>
          The data you are viewing is from a third party data source. This means
          that it has not been verified by the organization.
        </DialogContentText>
        <UpdateOrganizationForm
          existing_org={existing_org}
          setBatchStatusLink={setBatchStatusLink}
        />
      </DialogContent>
      <DialogContent>
        <DialogContentText>
          {batchStatus ? batchStatus.toString() : ''}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          CLOSE
        </Button>
      </DialogActions>
    </Dialog>
  );
};
