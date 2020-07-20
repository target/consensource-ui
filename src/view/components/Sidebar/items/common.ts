import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

export interface SidebarItemProps {
  onClick: (route: string) => void;
  isSelected: (route: string) => boolean;
}

export type SidebarItems = (({
  onClick,
  isSelected,
}: SidebarItemProps) => JSX.Element)[];

export const StyledListItem = withStyles({
  root: {
    flexDirection: 'column',
  },
})(ListItem);

export const StyledListItemIcon = withStyles({
  root: {
    justifyContent: 'center',
  },
})(ListItemIcon);
