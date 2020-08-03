import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';
import {
  SidebarItemsWithRoutes,
  SidebarItemProps,
  StyledListItem,
  StyledListItemIcon,
} from 'view/components/Sidebar/items/common';

function DashboardItem({ onClick, isSelected, route }: SidebarItemProps) {
  return (
    <StyledListItem
      button
      selected={isSelected}
      key={route}
      onClick={() => onClick(route)}
    >
      <StyledListItemIcon>
        <HomeIcon />
      </StyledListItemIcon>
      <ListItemText>
        <Typography variant="button">DASHBOARD</Typography>
      </ListItemText>
    </StyledListItem>
  );
}

function SearchItem({ onClick, isSelected, route }: SidebarItemProps) {
  return (
    <StyledListItem
      button
      selected={isSelected}
      key={route}
      onClick={() => onClick(route)}
    >
      <StyledListItemIcon>
        <SearchIcon />
      </StyledListItemIcon>
      <Typography variant="button">SEARCH</Typography>
    </StyledListItem>
  );
}

export const RetailerSidebarItems: SidebarItemsWithRoutes = [
  ['/', DashboardItem],
  ['/search', SearchItem],
];
