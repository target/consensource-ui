import React, { useState } from 'react';
import { AccountCircle as ProfileIcon } from '@material-ui/icons';
import {
  Menu,
  MenuItem,
  IconButton,
  IconButtonProps,
  Typography,
  Grid,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useStores } from 'services/hooks';
import { observer } from 'mobx-react-lite';

export interface ProfileIconWithUsernameButtonProps {
  onClick: IconButtonProps['onClick'];
  username?: string;
}

export const ProfileIconWithUsernameButton = ({
  onClick,
  username,
}: ProfileIconWithUsernameButtonProps) => {
  return (
    <IconButton
      color="inherit"
      aria-label="profile"
      onClick={onClick}
      edge="start"
    >
      <Grid container alignItems="center" spacing={1}>
        <ProfileIcon />

        {username && (
          <Grid item>
            <Typography>{username}</Typography>
          </Grid>
        )}
      </Grid>
    </IconButton>
  );
};

export const ProfileMenu = observer(() => {
  const { userStore } = useStores();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const username = userStore?.user?.username;

  const handleLogout = () => {
    userStore.logout();
    history.push('/');
  };

  const handleProfileClick = () => {
    setAnchorEl(null);
    history.push('/profile');
  };

  return (
    <div>
      <ProfileIconWithUsernameButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        username={username}
      />
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
});
