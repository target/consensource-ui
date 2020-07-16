import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';
import {
  SidebarItemProps,
  StyledListItem,
  StyledListItemIcon,
} from 'view/components/Sidebar/items/common';

export const DashboardItem = ({ onClick, isSelected }: SidebarItemProps) => {
  const route = '/dashboard';

  return (
    <StyledListItem
      button
      selected={isSelected(route)}
      key={route}
      onClick={() => onClick(route)}
    >
      <StyledListItemIcon>
        <HomeIcon />
      </StyledListItemIcon>
      <ListItemText>
        <Typography variant="caption">DASHBOARD</Typography>
      </ListItemText>
    </StyledListItem>
  );
};

export const SearchItem = ({ onClick, isSelected }: SidebarItemProps) => {
  const route = '/search';

  return (
    <StyledListItem
      button
      selected={isSelected(route)}
      key={route}
      onClick={() => onClick(route)}
    >
      <StyledListItemIcon>
        <SearchIcon />
      </StyledListItemIcon>
      <Typography variant="caption">SEARCH</Typography>
    </StyledListItem>
  );
};
