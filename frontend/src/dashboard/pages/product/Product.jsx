import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, deleteProduct, listProducts } from "../../../actions/productActions";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import { PRODUCT_DELETE_RESET, PRODUCT_CREATE_RESET } from "../../../constants/productConstants";
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';



export default function ProductListScreen(props) {
 
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const productCreate = useSelector((state) => state.productCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;
  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProducts());
  }, [createdProduct, dispatch, props.history, successCreate, successDelete]);

  const deleteHandler = (product) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteProduct(product._id));
    }
  };

  // State variables for modal
  const [openModal, setOpenModal] = useState(false);
  const [categories, setCategories] = useState([]); // State for storing categories
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    brand: "",
    category: "", // Changed to store category ID
    description: "",
    price: "",
    countInStock: "",
    rating: "",
    numReviews: "",
  });

  useEffect(() => {
    // Fetch categories from the backend
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/products/affiche/categorie');
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0], // Store the image file directly
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('image', formData.image); 
      console.log(formData.image); // Append the image file to FormData
  
      // Append other form data
      formDataToSend.append('brand', formData.brand);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('countInStock', formData.countInStock);
      formDataToSend.append('rating', formData.rating);
      formDataToSend.append('numReviews', formData.numReviews);
  
      const response = await axios.post('/api/products/products', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
        },
      });
      console.log('Product created:', response.data);

      setOpenModal(false);
    } catch (error) {
      console.error('Error creating product:', error);
      // Handle error as needed (e.g., show error message)
    }
  };
  
  const closeModalHandler = () => {
    setOpenModal(false);
  };

  return (
    <div className="home">
      <h2>Produit</h2>
      <button
        type="button"
        className="btn-success"
        onClick={() => setOpenModal(true)}
      >
        Créer un produit
      </button>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>IMAGE</th>
                <th>NOM</th>
                <th>PRIX</th>
                <th>CATÉGORIE</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img src={product.image} className="circular-image" alt="Product" />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <button
                      type="button"
                      className="modifier-button warning"
                      onClick={() => props.history.push(`/product/${product._id}/edit`)}
                    >
                      Modifier
                    </button>
                    <button
                      type="button"
                      className="supprimer-button"
                      onClick={() => deleteHandler(product)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal
        open={openModal}
        onClose={closeModalHandler}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        style={modalStyle}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box sx={contentStyle}>
            <Typography id="modal-title" variant="h6" component="h2">
              Create a New Product
            </Typography>
            <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
 <table style={{ width: '80%', fontSize: '14px', color: '#333333' }}>
    <tbody>
      <tr>
        <td>
          <label style={{ width: '80%', fontSize: '14px', color: '#333333' }} htmlFor="name">Name:</label>
        </td>
        <td>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </td>
      </tr>
      <tr>
        <td>
          <label style={{ width: '80%', fontSize: '14px', color: '#333333' }} htmlFor="image">Image URL:</label>
        </td>
        <td>
        <input style={{ width: '52%', fontSize: '14px', color: '#333333' }} type="file" accept="image/*" onChange={handleImageChange} />
        </td>
      </tr>
      <tr>
        <td>
          <label style={{ width: '80%', fontSize: '14px', color: '#333333' }} htmlFor="brand">Brand:</label>
        </td>
        <td>
          <input type="text" id="brand" name="brand" value={formData.brand} onChange={handleChange} />
        </td>
      </tr>
      <tr>
        <td>
          <label style={{ width: '80%', fontSize: '14px', color: '#333333' }} htmlFor="category">Category:</label>
        </td>
        <td>
        <select id="category" name="category" value={formData.category} onChange={handleChange}>
                          <option value="">Select Category</option>
                          {categories.map(category => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                          ))}
                        </select>        </td>
      </tr>
      <tr>
        <td>
          <label style={{ width: '80%', fontSize: '14px', color: '#333333' }} htmlFor="description">Description:</label>
        </td>
        <td>
          <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
        </td>
      </tr>
      <tr>
        <td>
          <label style={{ width: '80%', fontSize: '14px', color: '#333333' }} htmlFor="price">Price:</label>
        </td>
        <td>
          <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} />
        </td>
      </tr>
      <tr>
        <td>
          <label style={{ width: '80%', fontSize: '14px', color: '#333333' }} htmlFor="countInStock">Count In Stock:</label>
        </td>
        <td>
          <input type="number" id="countInStock" name="countInStock" value={formData.countInStock} onChange={handleChange} />
        </td>
      </tr>
      <tr>
        <td>
          <label style={{ width: '80%', fontSize: '14px', color: '#333333' }} htmlFor="rating">Rating:</label>
        </td>
        <td>
          <input type="number" id="rating" name="rating" value={formData.rating} onChange={handleChange} />
        </td>
      </tr>
      <tr>
        <td>
          <label style={{ width: '80%', fontSize: '14px', color: '#333333' }} htmlFor="numReviews">Number of Reviews:</label>
        </td>
        <td>
          <input type="number" id="numReviews" name="numReviews" value={formData.numReviews} onChange={handleChange} />
        </td>
      </tr>
      <tr>
        <td colSpan="2">
          <Button type="submit" variant="contained" color="primary">
            Create Product
          </Button>
        </td>
      </tr>
    </tbody>
  </table>
  </div>

</form>
          </Box>
        </Fade>
      </Modal>
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
  maxWidth: 600, // Adjusted maxWidth
  maxHeight: 600, // Adjusted maxHeight
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
