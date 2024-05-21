import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, Typography, Divider } from '@material-ui/core';
import { ShoppingCart, Category, LocalOffer, ChatBubbleOutline, DynamicFeed, LineStyle, MailOutline, PermIdentity, Report, Storefront, Timeline, TrendingUp, WorkOutline, ExitToApp } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signout } from '../../../actions/userActions';

const useStyles = makeStyles((theme) => ({
  sidebar: {
    width: 240,
    height: '100vh',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingTop: theme.spacing(2),
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    borderRight: '2px solid #e0e0e0',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  sidebarTitle: {
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(1),
    color: theme.palette.text.secondary,
    fontWeight: 'normal',
  },
  sidebarIcon: {
    color: 'green',
  },
  listItem: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

function Sidebar() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(signout());
    history.push('/signin');
  };

  return (
    <div className={classes.sidebar}>
      <div>
        <Typography variant="h6" className={classes.sidebarTitle}>
          Dashboard
        </Typography>
        <List>
          <Link to="/dashboard" className={classes.link}>
            <ListItem button className={classes.listItem}>
              <ListItemIcon>
                <LineStyle className={classes.sidebarIcon} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <ListItem button className={classes.listItem}>
            <ListItemIcon>
              <Timeline className={classes.sidebarIcon} />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItem>
          <ListItem button className={classes.listItem}>
            <ListItemIcon>
              <TrendingUp className={classes.sidebarIcon} />
            </ListItemIcon>
            <ListItemText primary="Sales" />
          </ListItem>
        </List>
        <Divider />
      </div>
      <div>
        <Typography variant="h6" className={classes.sidebarTitle}>
          Quick Menu
        </Typography>
        <List>
          <Link to="/users" className={classes.link}>
            <ListItem button className={classes.listItem}>
              <ListItemIcon>
                <PermIdentity className={classes.sidebarIcon} />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
          </Link>
          <Link to="/pro" className={classes.link}>
            <ListItem button className={classes.listItem}>
              <ListItemIcon>
                <Storefront className={classes.sidebarIcon} />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItem>
          </Link>
          <Link to="/OrderHistory" className={classes.link}>
            <ListItem button className={classes.listItem}>
              <ListItemIcon>
                <ShoppingCart className={classes.sidebarIcon} />
              </ListItemIcon>
              <ListItemText primary="Order" />
            </ListItem>
          </Link>
          <Link to="/categorie" className={classes.link}>
            <ListItem button className={classes.listItem}>
              <ListItemIcon>
                <Category className={classes.sidebarIcon} />
              </ListItemIcon>
              <ListItemText primary="Categories" />
            </ListItem>
          </Link>
          <Link to="/offre" className={classes.link}>
            <ListItem button className={classes.listItem}>
              <ListItemIcon>
                <LocalOffer className={classes.sidebarIcon} />
              </ListItemIcon>
              <ListItemText primary="Offre" />
            </ListItem>
          </Link>
        </List>
        <Divider />
      </div>
      <div>
        <Typography variant="h6" className={classes.sidebarTitle}>
          Notification
        </Typography>
        <List>
          <ListItem button className={classes.listItem}>
            <ListItemIcon>
              <MailOutline className={classes.sidebarIcon} />
            </ListItemIcon>
            <ListItemText primary="Mail" />
          </ListItem>
          <ListItem button className={classes.listItem}>
            <ListItemIcon>
              <DynamicFeed className={classes.sidebarIcon} />
            </ListItemIcon>
            <ListItemText primary="Feedback" />
          </ListItem>
          <ListItem button className={classes.listItem}>
            <ListItemIcon>
              <ChatBubbleOutline className={classes.sidebarIcon} />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItem>
        </List>
        <Divider />
      </div>
      <div>
        <Typography variant="h6" className={classes.sidebarTitle}>
          Stuff
        </Typography>
        <List>
          <ListItem button className={classes.listItem}>
            <ListItemIcon>
              <WorkOutline className={classes.sidebarIcon} />
            </ListItemIcon>
            <ListItemText primary="Manage" />
          </ListItem>
      
          <ListItem button className={classes.listItem}>
            <ListItemIcon>
              <Report className={classes.sidebarIcon} />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>
        </List>
        <Divider />
      </div>
      <div>
        <Typography variant="h6" className={classes.sidebarTitle}>
          Logout
        </Typography>
        <List>
          <ListItem button className={classes.listItem} onClick={handleSignout}>
            <ListItemIcon>
              <ExitToApp className={classes.sidebarIcon} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </div>
    </div>
  );
}

export default Sidebar;
