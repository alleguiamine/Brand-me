import React, { useEffect } from "react";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // Importez useParams pour récupérer les paramètres d'URL
import { listProductsByCategory } from "../actions/productActions";

export default function CatScreen() {
  const { category } = useParams(); // Récupérez la catégorie à partir des paramètres d'URL
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    // Chargez les produits en fonction de la catégorie sélectionnée
    dispatch(listProductsByCategory(category));
  }, [dispatch, category]); // Mettre à jour lorsque la catégorie change
  const filteredProducts = category ? products.filter(product => product.category === category) : products;

  return (
    <div className="productHome">
      <div className="tph">
        <div className="reg">
        <h3>Produits de la catégorie {category}</h3>
        </div>
      </div>

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {filteredProducts.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
      )}
    </div>
  );
}
