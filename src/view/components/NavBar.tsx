import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { observer } from 'mobx-react-lite';
import stores from 'stores';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import { useHistory } from 'react-router-dom';

export const NAVBAR_HEIGHT = '7.5vh';

const useStyles = makeStyles({
  navbar: {
    height: NAVBAR_HEIGHT,
    backgroundColor: 'white',
    color: 'black',
  },
  icon: {
    marginBottom: 10,
  },
  username: {
    marginLeft: 'auto',
  },
});

function NavBar() {
  const classes = useStyles();
  const history = useHistory();

  const { userStore } = stores;

  const onClick = (e: React.MouseEvent) => {
    const location = userStore.isSignedIn ? '/dashboard' : '/';
    history.push(location);
  };

  return (
    <AppBar className={classes.navbar}>
      <Toolbar>
        <IconButton
          aria-label="home"
          edge="start"
          className={classes.icon}
          onClick={onClick}
        >
          <HomeIcon />
        </IconButton>
        <Typography variant="body1" className={classes.username}>
          {userStore.isSignedIn && userStore.user!.username}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default observer(NavBar);
