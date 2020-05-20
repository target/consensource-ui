import UserStore from 'stores/UserStore';
import SnackbarStore from 'stores/SnackbarStore';

const snackbarStore = new SnackbarStore();
const userStore = new UserStore(snackbarStore);

const stores = {
  userStore,
  snackbarStore,
};

export default stores;
