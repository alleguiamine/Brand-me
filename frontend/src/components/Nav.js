import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // If you're using axios for HTTP requests
import { signout } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

function NavBar() {
  const [categories, setCategories] = useState([]);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  useEffect(() => {
    // Fetch categories from your backend server
    axios.get('/api/products/categories')
      .then(response => {
        setCategories(response.data); // Assuming response.data is an array of category objects
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []); // Empty dependency array to fetch categories only once when the component mounts

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src="/images/logobrand.png" alt="Your Logo" />
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
      </ul>

      <div className="dropdown">
        <Link to="#admin">
          Categories <i className="fa fa-caret-down"></i>
        </Link>
        <ul className="dropdown-content">
        {categories.map((category, index) => (
          <li key={index}>
            {/* Utilisez un lien pour naviguer vers la page HomeScreen avec la catégorie sélectionnée comme paramètre */}
            <Link to={`/products/${category}`}>{category}</Link>
          </li>
        ))}
        </ul>
      </div>

      <div className="navbar-functions">
        <Link to="/cart" className="Montserrat">
          Cart
          {/* Assuming cartItems is a state variable holding cart items */}
          {cartItems.length > 0 && (
            <span className="badge">{cartItems.length}</span>
          )}
        </Link>
        {userInfo ? (
          <div className="dropdown">
            <Link to="#" className="Montserrat">
              {userInfo.name} <i className="fa fa-caret-down"></i>
            </Link>
            <ul className="dropdown-content">
              <li><Link to="/profile">User Profile</Link></li>
              <li><Link to="/orderhistory">Order History</Link></li>
              <li><Link to="#signout" onClick={signoutHandler}>Sign Out</Link></li>
            </ul>
          </div>
        ) : (
          <Link to="/signin">Sign In</Link>
        )}
        {userInfo && userInfo.isAdmin && (
          <div className="dropdown">
            <Link to="#admin">
              Admin <i className="fa fa-caret-down"></i>
            </Link>
            <ul className="dropdown-content">
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/productlist">Products</Link></li>
              <li><Link to="/orderlist">Orders</Link></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
