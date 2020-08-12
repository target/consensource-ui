import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { CertificationDialog } from 'view/dialogs';
import { CertResData } from 'services/api';

export interface CertDialogButtonProps {
  certificate: CertResData;
}

export const CertDialogButton = ({ certificate }: CertDialogButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>{certificate.standard_name}</Button>
      <CertificationDialog
        open={open}
        onClose={() => setOpen(false)}
        certificate={certificate}
      />
    </div>
  );
};
