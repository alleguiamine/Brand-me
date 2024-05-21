import React, { useState, useEffect } from "react";
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

export default function ProductListScreen(props) {
  const [openOfferModal, setOpenOfferModal] = useState(false);
  const [formData, setFormData] = useState({
    offerName: "",
    Remise: 0,
    name: "",
    price: 0,
  });
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products/getproduct/n');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const selectedProduct = products.find(product => product.name === value);

    if (selectedProduct) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        price: selectedProduct.price,
      }));
    }
  };

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitOffer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/products/offers', formData);
      console.log('New offer added:', response.data);
      setFormData({
        offerName: "",
        Remise: 0,
        name: "",
        price: 0,
      });
      setOpenOfferModal(false);
    } catch (error) {
      console.error('Error adding offer:', error);
    }
  };

  const openOfferModalHandler = () => {
    setOpenOfferModal(true);
  };

  const closeOfferModalHandler = () => {
    setOpenOfferModal(false);
  };

  return (
    <div className="home">
      <div className="container">
        <div className="container my-2 py-2">
          <div className="row">
            <div className="col-12">
              <h1 style={{ "fontFamily":"'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', sans-serif"}} className="display-6 text-center mb-4">
                Liste des Offres de Produits</h1>
              <hr className="w-25 mx-auto"/>
              <h2>Offre de Produit</h2>
              <button
                className="btn btn-outline-success px-4 py-2 mb-4"
                type="button"
                onClick={openOfferModalHandler}
              >
                Ajouter une offre
                <span className="fa fa-plus" style={{ marginLeft: "5px" }}></span>
              </button>

              <Modal
                open={openOfferModal}
                onClose={closeOfferModalHandler}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                style={modalStyle}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={openOfferModal}>
                  <Box sx={contentStyle}>
                    <Typography id="modal-title" variant="h6" component="h2">
                      Ajouter une nouvelle offre
                    </Typography>
                    <form onSubmit={handleSubmitOffer}>
                      <div className="form-group">
                        <label htmlFor="offerName">Nom de l'offre:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="offerName"
                          name="offerName"
                          value={formData.offerName}
                          onChange={handleChange1}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">Nom de produit:</label>
                        <select id="name" name="name" value={formData.name} onChange={handleChange}>
                          <option value="">Select product</option>
                          {products.map(product => (
                            <option key={product._id} value={product.name}>{product.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="Remise">Remise (%):</label>
                        <input
                          type="number"
                          className="form-control"
                          id="Remise"
                          name="Remise"
                          value={formData.Remise}
                          onChange={handleChange1}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="price">Prix:</label>
                        <input
                          type="number"
                          className="form-control"
                          id="price"
                          name="price"
                          value={formData.price}
                          readOnly
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-success mt-3 mx-2"
                        >
                          Ajouter
                        </button>
                      </div>
                    </form>
                  </Box>
                </Fade>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const modalStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const contentStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 600,
  maxHeight: 400,
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
