import React, { useState } from 'react';
import { AccountCircle as ProfileIcon } from '@material-ui/icons';
import { Menu, MenuItem, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useStores } from 'services/hooks';
import { observer } from 'mobx-react-lite';

const useStyles = makeStyles({
  container: {
    marginLeft: 'auto',
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
  },
});

export const ProfileMenu = observer(() => {
  const history = useHistory();
  const { userStore } = useStores();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const classes = useStyles();

  const username = userStore?.user?.username;

  const handleIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    userStore.logout();
    history.push('/');
  };

  const handleProfileClick = () => {
    setAnchorEl(null);
    history.push('/profile');
  };

  return (
    <div className={classes.container}>
      <div className={classes.profile}>
        <IconButton
          color="inherit"
          aria-label="profile"
          onClick={handleIconClick}
          edge="start"
        >
          <ProfileIcon />
        </IconButton>
        <Typography>{username}</Typography>
      </div>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
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
