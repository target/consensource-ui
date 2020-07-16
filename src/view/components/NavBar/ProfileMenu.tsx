import React, { useState } from 'react';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';
import stores from 'stores';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  container: {
    marginLeft: 'auto',
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default function ProfileMenu() {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const classes = useStyles();

  const username = stores.userStore && stores.userStore.user?.username;

  const handleIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    stores.userStore.logout();
    history.push('/');
  };

  const handleProfileClick = () => {
    setAnchorEl(null);
    history.push('profile');
  };

  function ProfileDropdown() {
    return (
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    );
  }

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
      <ProfileDropdown />
    </div>
  );
}
