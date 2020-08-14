import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { UnclaimedDialog } from 'view/dialogs';
import { FactoryResData } from 'services/api';

export interface UnverifiedFactoryAlertProps {
  factory: FactoryResData;
}

export function UnverifiedFactoryAlert({
  factory,
}: UnverifiedFactoryAlertProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <div>
      <Alert
        severity="info"
        action={
          <Button onClick={() => setDialogIsOpen(true)}>LEARN MORE</Button>
        }
      >
        <AlertTitle>Unverified Factory</AlertTitle>
        Information about this factory is from third party sources
      </Alert>
      <UnclaimedDialog
        open={dialogIsOpen}
        handleClose={() => setDialogIsOpen(false)}
      />
    </div>
  );
}
