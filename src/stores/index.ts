import UserStore from 'stores/UserStore';
import CryptoStore from 'stores/CryptoStore';
import BatchStore from 'stores/BatchStore';

const cryptoStore = new CryptoStore();
const userStore = new UserStore(cryptoStore);
const batchStore = new BatchStore();

const stores = {
    cryptoStore,
    userStore,
    batchStore,
};

export default stores;
