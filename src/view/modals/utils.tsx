import { DialogProps as MUIDialogProps } from '@material-ui/core';
import { FactoryResData } from 'services/api';

export interface DialogProps extends MUIDialogProps {
  handleClose: () => void;
}

export interface OrgDialogProps extends DialogProps {
  existing_org: FactoryResData;
}
