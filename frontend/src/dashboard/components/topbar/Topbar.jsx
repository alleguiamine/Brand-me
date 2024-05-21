import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Badge, Avatar } from '@material-ui/core';
import { NotificationsNone, Language, Settings } from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import avatar from './avatar/ryan.jpg';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#2E3B55',
    boxShadow: 'none',
    borderBottom: '1px solid #1A2238',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 2),
  },
  logo: {
    height: 55,
    width:100
  },
  iconsContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  iconButton: {
    color: '#FFFFFF',
    marginLeft: theme.spacing(2),
  },
  avatar: {
    marginLeft: theme.spacing(2),
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

function Topbar() {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <img src="/images/logobrand.png" alt="Admin Logo" className={classes.logo} />
        <div className={classes.iconsContainer}>
          <IconButton className={classes.iconButton}>
            <Badge badgeContent={2} color="secondary">
              <NotificationsNone />
            </Badge>
          </IconButton>
          <IconButton className={classes.iconButton}>
            <Badge badgeContent={2} color="secondary">
              <Language />
            </Badge>
          </IconButton>
          <IconButton className={classes.iconButton}>
            <Settings />
          </IconButton>
          <IconButton className={classes.iconButton}>
          </IconButton>
          <Avatar src={avatar} className={classes.avatar} />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
