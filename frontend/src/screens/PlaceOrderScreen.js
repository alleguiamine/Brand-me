import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Container, Paper, Typography, Button, Grid, Divider } from "@mui/material";

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.taxPrice = 7;
  cart.totalPrice = cart.itemsPrice + cart.taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);

  return (
    <Container maxWidth="md">
      <CheckoutSteps step1 step2 step3 step4 />
      <Grid container spacing={3} justifyContent="flex-end" alignItems="flex-start">
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h4" gutterBottom>
              Expédition
            </Typography>
            <Typography>
              <strong>Nom:</strong> {cart.shippingAddress.fullName} <br />
              <strong>Adresse:</strong> {cart.shippingAddress.address},{" "}
              {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{" "}
              {cart.shippingAddress.country}
            </Typography>
          </Paper>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h4" gutterBottom>
              Paiement
            </Typography>
            <Typography>
              <strong>Méthode:</strong> {cart.paymentMethod}
            </Typography>
          </Paper>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h4" gutterBottom>
              Articles commandés
            </Typography>
            {cart.cartItems.map((item) => (
              <Grid container key={item.product} spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <img src={item.image} alt={item.name} style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={4}>
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </Grid>
                <Grid item xs={5}>
                  {item.qty} x {item.price} TND = {item.qty * item.price} TND
                </Grid>
              </Grid>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
              Récapitulatif de la commande
            </Typography>
            <Divider />
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <Typography>Articles :</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">{cart.itemsPrice.toFixed(2)} TND</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Livraison :</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">{cart.taxPrice} TND</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">Total :</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" align="right">{cart.totalPrice.toFixed(2)} TND</Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={placeOrderHandler}
                  disabled={cart.cartItems.length === 0}
                >
                  Passer la commande
                </Button>
              </Grid>
              {loading && (
                <Grid item xs={12}>
                  <LoadingBox />
                </Grid>
              )}
              {error && (
                <Grid item xs={12}>
                  <MessageBox variant="danger">{error}</MessageBox>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
