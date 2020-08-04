import { UserStore } from 'stores/UserStore';
import { SnackbarStore } from 'stores/SnackbarStore';

const snackbarStore = new SnackbarStore();
const userStore = new UserStore();

const stores = {
  userStore,
  snackbarStore,
};

export default stores;
