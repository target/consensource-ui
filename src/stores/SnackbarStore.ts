import { action, observable } from 'mobx';

export class SnackbarStore {
  @observable isOpen = false;

  @observable message = '';

  @action.bound
  open(message: string) {
    this.message = message;
    this.isOpen = true;
  }

  @action.bound
  handleClose() {
    this.isOpen = false;
  }
}
