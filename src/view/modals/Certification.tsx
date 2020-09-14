import React from 'react';
import { DialogTitle, Dialog, DialogProps } from '@material-ui/core';
import { CertResData } from 'services/api';

export interface CertificationDialogProps extends DialogProps {
  certificate: CertResData;
}

export function CertificationDialog({
  open,
  onClose,
  certificate,
}: CertificationDialogProps) {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{certificate.standard_name}</DialogTitle>
    </Dialog>
  );
}
