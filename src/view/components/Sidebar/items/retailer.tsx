import React from 'react';
import { Home as HomeIcon } from '@material-ui/icons';
import { SidebarItem } from './SidebarItem';

export const RetailerSidebarItems = () => {
  return (
    <>
      <SidebarItem route="/" icon={<HomeIcon />} label="Dashboard" />
    </>
  );
};
