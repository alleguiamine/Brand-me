import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { Container, Grid, Card, CardMedia, Typography, Button, MenuItem, Select, FormControl, InputLabel, Box, Paper, Divider } from '@mui/material';

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <Container style={{ marginTop: '30px'}}>
      
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
         
          <div className="text-center">  {/* Bootstrap class to center the text */}
          <h1 style={{ "fontFamily":"'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', sans-serif"}} className="display-6 text-center mb-4">
          le choix sélectionné</h1>

    </div>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
              <CardMedia
    component="img"
    image={`/../${product.image}`}
    sx={{ maxHeight: '400px', objectFit: 'contain' }}
/>

              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  {product.name}
                </Typography>
                <Box mb={2}>
                  <Rating rating={product.rating} 
                   numReviews={product.numReviews} />
                </Box>
                <Typography variant="body1" component="p" sx={{ mt: 2 }}>
                  {product.description}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" component="div" gutterBottom>
                  Prix
                </Typography>
                <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                  {product.price} TND
                </Typography>
                <Divider />
                <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                  Statut
                </Typography>
                <Typography variant="body1" component="div" sx={{ mb: 2 }}>
                  {product.countInStock > 0 ? (
                    <span style={{ color: 'green' }}>En stock</span>
                  ) : (
                    <span style={{ color: 'red' }}>Indisponible</span>
                  )}
                </Typography>
                <Divider />
                {product.countInStock > 0 && (
                  <>
                    <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
                      <InputLabel id="quantity-label">Quantité</InputLabel>
                      <Select
                        labelId="quantity-label"
                        id="quantity"
                        value={qty}
                        label="Quantité"
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <MenuItem key={x + 1} value={x + 1}>
                            {x + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Button
                      onClick={addToCartHandler}
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Ajouter au panier
                    </Button>
                  </>
                )}
              </Paper>
            </Grid>
          </Grid>
        </div>
      )}
    </Container>
  );
}