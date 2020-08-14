import { DialogProps as MUIDialogProps } from '@material-ui/core';

export interface DialogProps extends MUIDialogProps {
  handleClose: () => void;
}
