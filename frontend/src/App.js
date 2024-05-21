import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { signout, signin } from "./actions/userActions";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import VisitorRoute from "./components/VisitorRoute";
import Nav from "./components/Nav";
import '../node_modules/font-awesome/css/font-awesome.min.css';

import CartScreen from "./screens/CartScreen"; 
import HomeScreen from "./screens/HomeScreen";
import CatScreen from "./screens/CatScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductListScreen from "./dashboard/pages/product/Product.jsx";
import AppDash from "./dashboard/AppDash";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SigninScreen from "./screens/SigninScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import Footer from "./screens/Footer";



function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        {!userInfo || !userInfo.isAdmin ? (
          <header className="row">
            <Nav />
          </header>
        ) : null}
        <main>
          <VisitorRoute exact path="/" component={HomeScreen}></VisitorRoute>
          <VisitorRoute path="/cart/:id?" component={CartScreen}></VisitorRoute>
          <Route path="/products/:id" component={ProductScreen} exact></Route>
          <AdminRoute path="/signin" component={signin}></AdminRoute>
          <VisitorRoute path="/product/:id/edit" component={ProductEditScreen} exact></VisitorRoute>
          <VisitorRoute path="/signin" component={SigninScreen}></VisitorRoute>
          <VisitorRoute path="/register" component={RegisterScreen}></VisitorRoute>
          <VisitorRoute path="/shipping" component={ShippingAddressScreen}></VisitorRoute>
          <VisitorRoute path="/products/:category" component={CatScreen} />
          <VisitorRoute path="/payment" component={PaymentMethodScreen}></VisitorRoute>
          <VisitorRoute path="/placeorder" component={PlaceOrderScreen}></VisitorRoute>
          <VisitorRoute path="/order/:id" component={OrderScreen}></VisitorRoute>
          <VisitorRoute path="/orderhistory" component={OrderHistoryScreen}></VisitorRoute>
          <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
          <AdminRoute path="/productlist" component={ProductListScreen}></AdminRoute>
          <AdminRoute path="/orderlist" component={OrderListScreen}></AdminRoute>
          <AdminRoute path="/dashboard" component={AppDash}></AdminRoute>
          
        </main>

        {!userInfo || !userInfo.isAdmin ? <footer><Footer /></footer> : null}
      </div>
    </BrowserRouter>
  );
}

export default App;
