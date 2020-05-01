import UserStore from 'stores/UserStore';
import CryptoStore from 'stores/CryptoStore';
import { createContext } from 'react';

const cryptoStore = new CryptoStore();
const userStore = new UserStore(cryptoStore);

const stores = {
    cryptoStore,
    userStore,
};

export const StoreContext = createContext(stores);

export default stores;
