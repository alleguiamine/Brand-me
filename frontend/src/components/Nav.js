// NavBar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Toolbar, Button,Typography, Badge, Menu, MenuItem, Box, IconButton } from '@material-ui/core';
import { AccountCircle, ShoppingCart } from '@material-ui/icons';
import { signout } from "../actions/userActions";

function NavBar() {
  const [categories, setCategories] = useState([]);
  const [categoriesMenuAnchor, setCategoriesMenuAnchor] = useState(null);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  useEffect(() => {
    axios.get('/api/products/affiche/categorie')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleCategoriesMenuOpen = (event) => {
    setCategoriesMenuAnchor(event.currentTarget);
  };

  const handleCategoriesMenuClose = () => {
    setCategoriesMenuAnchor(null);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: 'white' }}>
      <Toolbar>
        <Box display="flex" flexGrow={1} alignItems="center">
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            <Typography variant="h6" style={{ marginRight: '20px', display: 'flex', alignItems: 'center' }}>
              <img src="/images/logobrand.png" className="logo-img" style={{ marginRight: '5px', width: '110px', height: '60px' }} />
            </Typography>
          </Link>
         
          <Menu
            id="categories-menu"
            anchorEl={categoriesMenuAnchor}
            keepMounted
            open={Boolean(categoriesMenuAnchor)}
            onClose={handleCategoriesMenuClose}
          >
            {categories.map((category, index) => (
              <MenuItem key={index} component={Link} to={`/products/${category.name}`} onClick={handleCategoriesMenuClose}>
                {category.name}
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Button component={Link} to="/" style={{ color: 'black', fontWeight: 'bold' }}>Home</Button>
          <Button aria-controls="categories-menu" aria-haspopup="true" style={{ color: 'black', fontWeight: 'bold' }} onClick={handleCategoriesMenuOpen}>
            Categories
          </Button>
        <Button component={Link} to="/cart" style={{ color: 'black', fontWeight: 'bold' }}>
          Cart
          {cartItems.length > 0 && (
            <Badge badgeContent={cartItems.length} color="secondary">
              <ShoppingCart />
            </Badge>
          )}
        </Button>
        <div>
          {userInfo ? (
            <IconButton
              style={{ color: 'black', fontWeight: 'bold' }}
              aria-label="account of current user"
              aria-controls="profile-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
            >
              {userInfo.image ? (
                <img src={userInfo.image} alt="User" style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
              ) : (
                <AccountCircle />
              )}
            </IconButton>
          ) : (
            <Button component={Link} to="/signin" style={{ color: 'black', fontWeight: 'bold' }}>Sign In</Button>
          )}
          <Menu
            id="profile-menu"
            anchorEl={profileMenuAnchor}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(profileMenuAnchor)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem component={Link} to="/profile" onClick={handleProfileMenuClose}>User Profile</MenuItem>
            <MenuItem component={Link} to="/orderhistory" onClick={handleProfileMenuClose}>Order History</MenuItem>
            <MenuItem onClick={signoutHandler}>Sign Out</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
