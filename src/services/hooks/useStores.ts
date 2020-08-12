import { useContext } from 'react';
import { StoresContext } from 'stores';

export const useStores = () => useContext(StoresContext);
