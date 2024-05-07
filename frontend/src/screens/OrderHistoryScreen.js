import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrderMine } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function OrderHistoryScreen(props) {
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  
  return (
    <div className="orderlist">
      <h1 className="orderHistory">Order History</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr className="orderHistory">
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>IMAGES</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr className="ordertext" key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>
                  {order.orderItems.map((item) => (
                    <img key={item._id} src={item.image} alt={item.name} style={{ width: '50px', height: '50px', margin: '5px' }} />
                  ))}
                </td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : "No"}</td>
                <td>
                  <button
                    type="button"
                    className="button-info"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
