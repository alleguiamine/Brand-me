import React, { useState } from "react";
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import CategoryListScreen from './CategoryListScreen';

export default function ProductListScreen(props) {
  // State variables for modal
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [formData, setFormData] = useState({
    categoryName: "", // Champ pour le nom de la catégorie
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('api/products/categories', formData);
      console.log('New category added:', response.data);
      setFormData((prevData) => ({
        ...prevData,
        categoryName: "",
      }));
      setOpenCategoryModal(false);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const openCategoryModalHandler = () => {
    setOpenCategoryModal(true);
  };

  const closeCategoryModalHandler = () => {
    setOpenCategoryModal(false);
  };

  return (
    <div className="home">
      <div className="container">
    <div className="container my-2 py-2">
        <div className="row">
            <div className="col-12">
            <h1 style={{ "fontFamily":"'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', sans-serif"}} className="display-6 text-center mb-4">
              Liste des Catégorie</h1>

                <hr className="w-25 mx-auto"/>
                 
      <h2>Produit</h2>
      <button
     className="btn btn-outline-success px-4 py-2 mb-4"
        type="button"
        onClick={openCategoryModalHandler}
      >
        Ajouter une catégorie
        <span className="fa fa-plus" style={{ marginLeft: "5px" }}></span>
      </button>
     

      <Modal
        open={openCategoryModal}
        onClose={closeCategoryModalHandler}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        style={modalStyle}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openCategoryModal}>
          <Box sx={contentStyle}>
            <Typography id="modal-title" variant="h6" component="h2">
              Ajouter une nouvelle catégorie
            </Typography>
            <form onSubmit={handleSubmitCategory}>
              <div className="form-group">
                <label htmlFor="categoryName">Nom de la catégorie:</label>
                <input
                  type="text"
                  className="form-control"
                  id="categoryName"
                  name="categoryName"
                  value={formData.categoryName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <Button type="submit" variant="contained" color="primary">
                  Ajouter
                </Button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
      <CategoryListScreen />
    </div>
    </div></div></div></div>  
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
  maxHeight: 400, // Adjusted maxHeight
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
