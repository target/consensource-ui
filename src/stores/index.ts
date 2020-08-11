import { UserStore } from 'stores/UserStore';
import { SnackbarStore } from 'stores/SnackbarStore';
import { BatchStore } from 'stores/BatchStore';

const snackbarStore = new SnackbarStore();
const userStore = new UserStore();
const batchStore = new BatchStore();

const stores = {
  userStore,
  snackbarStore,
  batchStore,
};

export * from 'stores/UserStore';
export * from 'stores/SnackbarStore';
export * from 'stores/BatchStore';

export default stores;
