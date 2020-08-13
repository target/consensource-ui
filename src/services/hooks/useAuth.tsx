import { useContext } from 'react';
import { AuthContext } from 'view/context';

export const useAuth = () => useContext(AuthContext);
