import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";

import CheckoutSteps from "../components/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
 
  cart.taxPrice = 7
  cart.totalPrice = cart.itemsPrice  + cart.taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    // TODO: dispatch place order action
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);
  return (
    <div className="order">
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-4">
          <ul>
            <li>
              <div className="card card-body">
                <h2 className="vg">Expédition</h2>
                <p>
                  <strong className="vg">Nom:</strong>{" "}
                  {cart.shippingAddress.fullName} <br />
                  <strong className="vg">Adresse: </strong>{" "}
                  {cart.shippingAddress.address},{cart.shippingAddress.city},{" "}
                  {cart.shippingAddress.postalCode},
                  {cart.shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2 className="vg">Paiement</h2>
                <p>
                  <strong className="vg">Méthode:</strong> {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2 className="vg">Articles commandés</h2>
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x {item.price} DT = {item.qty * item.price}{" "}
                          DT
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <div className="card card-body">
            <ul>
              <li>
                <h2>Récapitulatif de la commande</h2>
              </li>
              <li>
                <div className="row">
                  <div>Articles :</div>
                  <div>{cart.itemsPrice.toFixed(2)} DT</div>
                </div>
              </li>
           
              <li>
                <div className="row">
                  <div>Livraison :</div>
                  <div>{cart.taxPrice} DT</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Total :</strong>
                  </div>
                  <div>
                    <strong>{cart.totalPrice.toFixed(2)} DT</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary block"
                  disabled={cart.cartItems.length === 0}
                >
                  Passer la commande
                </button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
