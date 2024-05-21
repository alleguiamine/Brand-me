import React from "react";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";

export default function ProductCard({ product }) {
  return (
    <div className="col-md-3 col-sm-6 mb-4 m-8" style={{ marginTop: '50px' }}>
      <div className="card m-4">
        {product.percent && <span className="percent">{product.percent}</span>}
        <div className="card-image">
          <Link to={`/products/${product._id}`}>
            <img className="img-fluid" src={`/../${product.image}`} alt={product.name} />
          </Link>
        </div>
        <div className="card-inner">
          <h5 className="mb-0">{product.name}</h5>
          <div className="price">
            <span>{product.price} TND</span>
          </div>
          <div>
            <Rating rating={product.rating} numReviews={product.numReviews} />
          </div>
          <div className="mt-3 d-flex justify-content-between align-items-center">
            <Link to={`/products/${product._id}`}>
              <button className="btn btn-success text-uppercase btn-sm details">
                Add to cart
              </button>
            </Link>
            <div className="d-flex flex-row">
              <span className="wishlist">
                <i className="fa fa-heart"></i>
              </span>
              <span className="cart">
                <i className="fa fa-shopping-cart"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
