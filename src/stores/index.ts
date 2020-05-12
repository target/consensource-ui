import UserStore from 'stores/UserStore';
import CryptoStore from 'stores/CryptoStore';
import BatchStore from 'stores/BatchStore';
import SnackbarStore from 'stores/SnackbarStore';

const cryptoStore = new CryptoStore();
const snackbarStore = new SnackbarStore();
const userStore = new UserStore(cryptoStore, snackbarStore);
const batchStore = new BatchStore(snackbarStore);

const stores = {
  cryptoStore,
  userStore,
  batchStore,
  snackbarStore,
};

export default stores;
