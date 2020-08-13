import React, { FC, useContext, createContext } from 'react';
import { User } from 'stores';

/**
 * By default, React will only use the default value passed to
 * `createContext` if a provider is not found. Since we are
 * explicitly wrapping the app in an `AuthProvider`, this default
 * value will never be used.
 *
 * Setting the default value to `{} as User` is a hack to
 * prevent TS from complaining about a potentially null
 * default value.
 */
export const AuthContext = createContext({} as User);

export interface AuthProviderProps {
  value: User;
}

export const AuthProvider: FC<AuthProviderProps> = ({ value, children }) => {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
