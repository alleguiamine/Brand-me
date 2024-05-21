import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrderMine } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import { Visibility } from "@mui/icons-material";

export default function OrderHistoryScreen(props) {
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  
  return (
    <Container  maxWidth="md">
      <Typography variant="h1" align="center" gutterBottom>
        Order History
      </Typography>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Images</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Delivered</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                  <TableCell>{order.totalPrice.toFixed(2)}</TableCell>
                  <TableCell>
                    {order.orderItems.map((item) => (
                      <img
                        key={item._id}
                        src={item.image}
                        alt={item.name}
                        style={{ width: '50px', height: '50px', margin: '5px' }}
                      />
                    ))}
                  </TableCell>
                  <TableCell>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</TableCell>
                  <TableCell>{order.isDelivered ? order.deliveredAt.substring(0, 10) : "No"}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        props.history.push(`/order/${order._id}`);
                      }}
                    >
                      <Visibility />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
