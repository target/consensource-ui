import React from 'react';
import { Home as HomeIcon, Search as SearchIcon } from '@material-ui/icons';
import { SidebarItem } from './SidebarItem';

export const RetailerSidebarItems = () => {
  return (
    <>
      <SidebarItem route="/" icon={<HomeIcon />} label="DASHBOARD" />
      <SidebarItem
        route="/search"
        icon={<SearchIcon />}
        label="SEARCH"
        lastItem
      />
    </>
  );
};
