import { useLocation } from 'react-router-dom';
/**
 * Custom hook that tracks changes to the `pathname` location
 * object and returns a boolean value indicating whether or
 * not the passed `route` param is a subroute of the current path.
 */
export const useSelectedRoute = (route: string) => {
  const { pathname } = useLocation();

  const isSelected =
    route === '/' ? pathname === '/' : pathname.includes(route);

  return isSelected;
};
