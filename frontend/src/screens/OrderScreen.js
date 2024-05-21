import Axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsOrder, payOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_PAY_RESET } from "../constants/orderConstants";
import { Container, Paper, Typography, Button, Grid, Divider } from "@mui/material";

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay || (order && order._id !== orderId)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, sdkReady, successPay]);
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <Container style={{ marginTop: '60px'}} maxWidth="md">
     
        Commande {order._id}

        
     
     
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6">Expédition</Typography>
            <Typography>
              <strong>Nom:</strong> {order.shippingAddress.fullName} <br />
              <strong>Adresse:</strong> {order.shippingAddress.address},{" "}
              {order.shippingAddress.city}, {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country} <br />
              <strong>Téléphone:</strong> {order.shippingAddress.telephone}
            </Typography>
            {order.isDelivered ? (
              <MessageBox variant="success">
                Livré à {order.deliveredAt}
              </MessageBox>
            ) : (
              <MessageBox variant="danger">Non livré</MessageBox>
            )}
          </Paper>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6">Paiement</Typography>
            <Typography>
              <strong>Méthode:</strong> {order.paymentMethod}
            </Typography>
            {order.isPaid ? (
              <MessageBox variant="success">
                Payé à {order.paidAt}
              </MessageBox>
            ) : (
              <MessageBox variant="danger">Impayé</MessageBox>
            )}
          </Paper>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6">Articles commandés</Typography>
            {order.orderItems.map((item) => (
              <Grid container key={item.product} spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <img src={`/../${item.image}`} alt={item.name} style={{ width: '100%' }} />
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
            <Typography variant="h6">Récapitulatif de la commande</Typography>
            <Divider sx={{ my: 1 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography>Articles :</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">{order.itemsPrice.toFixed(2)} TND</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Livraison :</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">{order.taxPrice.toFixed(2)} TND</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">Total :</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" align="right">{order.totalPrice.toFixed(2)} TND</Typography>
              </Grid>
              {!order.isPaid && (
                <Grid item xs={12}>
                  {!sdkReady ? (
                    <LoadingBox />
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox />}
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    </>
                  )}
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
