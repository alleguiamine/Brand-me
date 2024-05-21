import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, listOrders } from "../../../actions/orderActions";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ORDER_DELETE_RESET } from "../../../constants/orderConstants";
import IconButton from '@mui/material/IconButton';
import PrintIcon from '@mui/icons-material/Print';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import "./OrderHistory.css";

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

const handlePrintPDF = () => {
  setTimeout(() => {
    const input = document.getElementById('pdf-content');
    if (!input) {
      console.error("Invalid element provided as first argument.");
      return;
    }

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('order_details.pdf');
      })
      .catch((error) => {
        console.error("Error capturing element:", error);
      });
  }, 500); // Adjust the delay time as needed
};

export default function OrderListScreen(props) {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(listOrders());
  }, [dispatch, successDelete]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const openModalHandler = (order) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  const deleteHandler = (order) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteOrder(order._id));
    }
  };

  return (
    <div className="home">
      <div className="container my-2 py-2">
        <div className="row">
          <div className="col-12">
            <h1 style={{ fontFamily: "'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', sans-serif" }} className="display-6 text-center mb-4">
              Liste des Commandes
            </h1>
            <hr className="w-25 mx-auto" />

            {loadingDelete && <LoadingBox />}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {loading ? (
              <LoadingBox />
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <>
                <table className="table">
                  <thead>
                    <tr className="order">
                      <th>ID</th>
                      <th>UTILISATEUR</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                      <th>PAYÉ</th>
                      <th>LIVRÉ</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr className="ordertext" key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.user ? order.user.name : 'Utilisateur inconnu'}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{order.totalPrice.toFixed(2)}</td>
                        <td>{order.isPaid ? order.paidAt.substring(0, 10) : "Non"}</td>
                        <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : "Non"}</td>
                        <td>
                          <IconButton onClick={() => openModalHandler(order)} className="icon-button">
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton onClick={() => deleteHandler(order)} className="icon-button">
                            <DeleteIcon />
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={openModal}
                  onClose={closeModalHandler}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                  style={modalStyle}
                >
                  <Fade in={openModal}>
                    <Box sx={contentStyle}>
                      {selectedOrder && (
                        <div>
                          <div id="pdf-content">
                            <img src="/images/logobrand.png" alt="Company Logo" style={{ width: '120px', marginBottom: '15px' }} />
                            <Typography
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                fontSize: '32px',
                                color: '#008000',
                                fontFamily: 'Arial, sans-serif',
                                fontWeight: 'bold',
                                textDecoration: 'underline',
                                marginBottom: '20px',
                              }}
                              id="transition-modal-title"
                              variant="h6"
                              component="h2"
                            >
                              Détails de la commande
                            </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                              <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <table style={{ width: '80%', fontSize: '14px', color: '#333333', borderCollapse: 'collapse' }} border="1">
                                  <tbody>
                                    <tr>
                                      <td style={{ fontWeight: 'bold', padding: '8px' }}>ID:</td>
                                      <td style={{ padding: '8px' }}>{selectedOrder._id}</td>
                                    </tr>
                                    <tr>
                                      <td style={{ fontWeight: 'bold', padding: '8px' }}>Utilisateur:</td>
                                      <td style={{ padding: '8px' }}>{selectedOrder.user ? selectedOrder.user.name : 'Utilisateur inconnu'}</td>
                                    </tr>
                                    <tr>
                                      <td style={{ fontWeight: 'bold', padding: '8px' }}>Date:</td>
                                      <td style={{ padding: '8px' }}>{selectedOrder.createdAt.substring(0, 10)}</td>
                                    </tr>
                                    <tr>
                                      <td style={{ fontWeight: 'bold', padding: '8px' }}>Prix Total:</td>
                                      <td style={{ padding: '8px' }}>{selectedOrder.totalPrice.toFixed(2)} TND</td>
                                    </tr>
                                    <tr>
                                      <td style={{ fontWeight: 'bold', padding: '8px' }}>Méthode de Paiement:</td>
                                      <td style={{ padding: '8px' }}>{selectedOrder.paymentMethod}</td>
                                    </tr>
                                    <tr>
                                      <td colSpan="2" style={{ fontWeight: 'bold', padding: '8px' }}>Adresse de Livraison:</td>
                                    </tr>
                                    <tr>
                                      <td style={{ fontWeight: 'bold', padding: '8px' }}>Nom Complet:</td>
                                      <td style={{ padding: '8px' }}>{selectedOrder.shippingAddress.fullName}</td>
                                    </tr>
                                    <tr>
                                      <td style={{ fontWeight: 'bold', padding: '8px' }}>Adresse:</td>
                                      <td style={{ padding: '8px' }}>{selectedOrder.shippingAddress.address}</td>
                                    </tr>
                                    <tr>
                                      <td style={{ fontWeight: 'bold', padding: '8px' }}>Téléphone:</td>
                                      <td style={{ padding: '8px' }}>{selectedOrder.shippingAddress.telephone}</td>
                                    </tr>
                                    <tr>
                                      <td style={{ fontWeight: 'bold', padding: '8px' }}>Ville:</td>
                                      <td style={{ padding: '8px' }}>{selectedOrder.shippingAddress.city}</td>
                                    </tr>
                                    <tr>
                                      <td style={{ fontWeight: 'bold', padding: '8px' }}>Code Postal:</td>
                                      <td style={{ padding: '8px' }}>{selectedOrder.shippingAddress.postalCode}</td>
                                    </tr>
                                    <tr>
                                      <td style={{ fontWeight: 'bold', padding: '8px' }}>Pays:</td>
                                      <td style={{ padding: '8px' }}>{selectedOrder.shippingAddress.country}</td>
                                    </tr>
                                    <tr>
                                      <td colSpan="2" style={{ fontWeight: 'bold', padding: '8px' }}>Articles:</td>
                                    </tr>
                                    {selectedOrder.orderItems.map((item) => (
                                      <tr key={item.product}>
                                        <td style={{ fontWeight: 'bold', padding: '8px' }}>{item.name}</td>
                                        <td style={{ padding: '8px' }}>Qty: {item.qty}, Prix: {item.price} TND</td>
                                      </tr>
                                    ))}
                                    <tr>
                                      <td style={{ fontWeight: 'bold', padding: '8px' }}>Prix des Articles:</td>
                                      <td style={{ padding: '8px' }}>{selectedOrder.itemsPrice} TND</td>
                                    </tr>
                                    <tr>
                                      <td style={{ fontWeight: 'bold', padding: '8px' }}>Prix des Taxes:</td>
                                      <td style={{ padding: '8px' }}>{selectedOrder.taxPrice} TND</td>
                                    </tr>
                                    <tr>
                                      <td style={{ fontWeight: 'bold', padding: '8px' }}>Payé:</td>
                                      <td style={{ padding: '8px' }}>{selectedOrder.isPaid ? 'Oui' : 'Non'}</td>
                                    </tr>
                                    <tr>
                                      <td style={{ fontWeight: 'bold', padding: '8px' }}>Payé le:</td>
                                      <td style={{ padding: '8px' }}>{selectedOrder.isPaid ? selectedOrder.paidAt.substring(0, 10) : 'N/A'}</td>
                                    </tr>
                                    <tr>
                                      <td style={{ fontWeight: 'bold', padding: '8px' }}>Livré:</td>
                                      <td style={{ padding: '8px' }}>{selectedOrder.isDelivered ? 'Oui' : 'Non'}</td>
                                    </tr>
                                    <tr>
                                      <td style={{ fontWeight: 'bold', padding: '8px' }}>Livré le:</td>
                                      <td style={{ padding: '8px' }}>{selectedOrder.isDelivered ? selectedOrder.deliveredAt.substring(0, 10) : 'N/A'}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </Typography>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                              <Button style={{ fontSize: '10px', marginRight: '10px' }} onClick={handlePrintPDF}>
                                Imprimer PDF
                                <IconButton style={{ fontSize: '40px', color: 'green' }}>
                                  <PrintIcon />
                                </IconButton>
                              </Button>
                            </div>
                            <div>
                              <Button style={{ fontSize: '10px', marginLeft: '10px' }} onClick={closeModalHandler}>
                                Fermer
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Box>
                  </Fade>
                </Modal>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
