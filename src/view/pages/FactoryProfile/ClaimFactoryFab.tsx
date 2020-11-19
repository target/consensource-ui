import React from 'react';
import { Fab } from '@material-ui/core';
import { VerifiedUserOutlined } from '@material-ui/icons';
import { FactoryResData } from 'services/api';
import { TransferFactoryDialog } from 'view/modals';
import { useAuth } from 'services/hooks';

export interface ClaimFactoryFabProps {
  factory: FactoryResData;
}

export const ClaimFactoryFab = ({ factory }: ClaimFactoryFabProps) => {
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
      {!factory.assertion_id || (
        <Fab
          color="primary"
          variant="extended"
          aria-label="claim"
          style={{
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed',
          }}
          onClick={handleOpen}
          disabled={!signer}
        >
          <VerifiedUserOutlined />
          Claim this factory
        </Fab>
      )}
      <TransferFactoryDialog
        open={open}
        handleClose={handleClose}
        existingOrg={factory}
      />
    </>
  );
};
