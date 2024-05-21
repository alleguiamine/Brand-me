import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";
import { Container, Grid, Paper, Typography, Button, Select, MenuItem, FormControl, InputLabel, Box, Divider } from '@mui/material';

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push("/shipping");
  };

  return (
    <Container style={{ marginTop: '60px'}}>
      <Typography variant="h4" component="h1" gutterBottom>
        Panier
      </Typography>
      {cartItems.length === 0 ? (
        <MessageBox>
          Le panier est vide. <Link to="/">Aller faire du shopping</Link>
        </MessageBox>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {cartItems.map((item) => (
              <Paper key={item.product} elevation={3} sx={{ p: 2, mb: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={4} md={2}>
                    <img src={`/../${item.image}`} alt={item.name} style={{ width: '100%' }} />
                  </Grid>
                  <Grid item xs={8} md={6}>
                    <Typography variant="h6" component={Link} to={`/product/${item.product}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                      {item.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} md={2}>
                    <FormControl fullWidth>
                      <InputLabel id={`quantity-label-${item.product}`}>Quantité</InputLabel>
                      <Select
                        labelId={`quantity-label-${item.product}`}
                        id={`quantity-${item.product}`}
                        value={item.qty}
                        label="Quantité"
                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <MenuItem key={x + 1} value={x + 1}>
                            {x + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4} md={2}>
                    <Typography variant="h6">
                      {item.price} TND
                    </Typography>
                  </Grid>
                  <Grid item xs={4} md={2}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Supprimer
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Total ({cartItems.reduce((a, c) => a + c.qty, 0)} articles) :
              </Typography>
              <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)} TND
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
              >
                Passer à la caisse
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
