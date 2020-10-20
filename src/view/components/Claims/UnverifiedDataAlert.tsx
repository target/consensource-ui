import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { UnclaimedDialog } from 'view/modals';

export const UnverifiedDataAlert = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <div>
      <Alert
        severity="info"
        action={
          <Button onClick={() => setDialogIsOpen(true)}>LEARN MORE</Button>
        }
      >
        <AlertTitle>Unverified Data</AlertTitle>
        The source of this data is from third party sources
      </Alert>
      <UnclaimedDialog
        open={dialogIsOpen}
        handleClose={() => setDialogIsOpen(false)}
      />
    </div>
  );
};
