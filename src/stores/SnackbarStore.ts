import { action, observable } from 'mobx';

export default class SnackbarStore {
  @observable isOpen = false;

  @observable message = '';

  @action.bound
  triggerSnackbar(message: string) {
    this.message = message;
    this.isOpen = true;
  }

  @action.bound
  handleClose(
    event: React.SyntheticEvent | React.MouseEvent, // eslint-disable-line @typescript-eslint/no-unused-vars
    reason?: string, // eslint-disable-line @typescript-eslint/no-unused-vars
  ) {
    this.isOpen = false;
  }
}
