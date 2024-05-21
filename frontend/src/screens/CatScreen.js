import React, { useEffect } from "react";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listProductsByCategory } from "../actions/productActions";

export default function CatScreen() {
  const { category } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProductsByCategory(category));
  }, [dispatch, category]);

  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;
  
  return (
    <div className="container" style={{ marginTop: '60px'}} >
      <div className="row">
        <div className="col">
          <h3 className="text-center">Produits de la catégorie {category}</h3>
        </div>
      </div>
      <div className="row justify-content-center">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          filteredProducts.map((product) => (
            <div key={product._id} className="col-md-3 col-sm-5">
              <Product product={product}></Product>
            </div>
          ))
        )}
      </div>
    </div>
  );
}