import { useContext } from 'react';
import { StoresContext } from 'view/context';

export const useStores = () => useContext(StoresContext);
