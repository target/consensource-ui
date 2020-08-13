import { UserStore } from './UserStore';
import { SnackbarStore } from './SnackbarStore';

export const stores = {
  snackbarStore: new SnackbarStore(),
  userStore: new UserStore(),
};

export * from './UserStore';
export * from './SnackbarStore';
