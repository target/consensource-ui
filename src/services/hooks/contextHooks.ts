import { useContext } from 'react';
import { StoresContext, AuthContext } from 'view/context';

export const useStores = () => useContext(StoresContext);

export const useAuth = () => useContext(AuthContext);
