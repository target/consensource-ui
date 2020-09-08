import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
/**
 * Custom hook that tracks changes to the `pathname` location
 * object and returns a boolean value indicating whether or
 * not the passed `route` param is a subroute of the current path.
 */
export const useSelectedRoute = (route: string) => {
  const history = useHistory();
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    history.listen(({ pathname }) => {
      const isRouteSelected =
        route === '/' ? pathname === '/' : pathname.includes(route);
      setIsSelected(isRouteSelected);
    });
  }, [history]);

  return isSelected;
};
