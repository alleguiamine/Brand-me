import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { Container, Paper, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';

export default function PaymentMethodScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push('/placeorder');
  };

  return (
    <Container maxWidth="sm">
      <CheckoutSteps step1 step2 step3 />
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Mode de paiement
        </Typography>
        <form onSubmit={submitHandler}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Sélectionnez un mode de paiement</FormLabel>
            <RadioGroup
              aria-label="paymentMethod"
              name="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel value="PayPal" control={<Radio />} label="PayPal" />
              <FormControlLabel value="Stripe" control={<Radio />} label="Stripe" />
            </RadioGroup>
          </FormControl>
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
            Continuer
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
