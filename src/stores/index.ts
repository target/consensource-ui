import UserStore from 'stores/UserStore';
import BatchStore from 'stores/BatchStore';
import SnackbarStore from 'stores/SnackbarStore';

const snackbarStore = new SnackbarStore();
const userStore = new UserStore(snackbarStore);
const batchStore = new BatchStore(snackbarStore);

const stores = {
  userStore,
  batchStore,
  snackbarStore,
};

export default stores;
