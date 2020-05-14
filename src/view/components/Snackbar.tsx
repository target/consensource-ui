import React from 'react';
import MUISnackbar from '@material-ui/core/Snackbar';

export interface SnackBarProps {
  message: string;
  isOpen: boolean;
  autoHideDuration?: number;
  onClose: (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string,
  ) => void;
}

export const DEFAULT_SNACKBAR_DURATION = 3000;

// TODO: Default ConsenSource styling
export default function Snackbar(props: SnackBarProps) {
  const {
    message,
    isOpen,
    onClose,
    autoHideDuration = DEFAULT_SNACKBAR_DURATION,
  } = props;

  return (
    <MUISnackbar
      open={isOpen}
      onClose={onClose}
      message={message}
      autoHideDuration={autoHideDuration}
    />
  );
}
