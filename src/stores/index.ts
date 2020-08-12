import { createContext } from 'react';
import { UserStore } from './UserStore';
import { SnackbarStore } from './SnackbarStore';
import { BatchStore } from './BatchStore';

export const stores = {
  snackbarStore: new SnackbarStore(),
  userStore: new UserStore(),
  batchStore: new BatchStore(),
};

export const StoresContext = createContext(stores);

export * from './UserStore';
export * from './SnackbarStore';
export * from './BatchStore';
