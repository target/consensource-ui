import React from 'react';
import MUISnackbar, { SnackbarProps } from '@material-ui/core/Snackbar';

export const DEFAULT_SNACKBAR_DURATION = 3000;

// TODO: ConsenSource styling
export default function Snackbar(props: SnackbarProps) {
  const {
    message,
    open,
    onClose,
    autoHideDuration = DEFAULT_SNACKBAR_DURATION,
  } = props;

  return (
    <MUISnackbar
      open={open}
      onClose={onClose}
      message={message}
      autoHideDuration={autoHideDuration}
    />
  );
}
