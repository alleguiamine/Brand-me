import express from "express";
import expressAsyncHandler from "express-async-handler";
// import data from "../data.js";
import Product from "../models/productModel.js";
import { isAdmin, isAuth } from "../utils.js";

const productRouter = express.Router();

// Route pour récupérer toutes les catégories
productRouter.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    try {
      const products = await Product.find({}, "category"); // Rechercher tous les produits et projeter uniquement le champ 'category'
      const categories = [...new Set(products.map(product => product.category))]; // Utiliser un ensemble pour obtenir des valeurs uniques
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  })
);

// Route pour récupérer les produits par catégorie
productRouter.get(
  "/by-category",
  expressAsyncHandler(async (req, res) => {
    const { category } = req.query;
    const filter = category ? { category } : {};

    try {
      const products = await Product.find(filter);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  })
);

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    //await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: "sample name " + Date.now(),
      image: "/images/p1.jpg",
      price: 0,
      category: "sample category",
      brand: "sample brand",
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: "sample description",
    });
    const createdProduct = await product.save();
    res.send({ message: "Product Created", product: createdProduct });
  })
);

productRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      res.send({ message: "Product Updated", product: updatedProduct });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);
productRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send({ message: "Product Deleted", product: deleteProduct });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

// productRouter.get(
//   "/categories",
//   expressAsyncHandler(async (req, res) => {
//     const categories = await Product.distinct("category");
//     res.json(categories);
//   })
// );

// // Route pour récupérer les produits par catégorie
// productRouter.get(
//   "/by-category",
//   expressAsyncHandler(async (req, res) => {
//     const { category } = req.query;
//     const filter = category ? { category } : {};

//     const products = await Product.find(filter);
//     res.json(products);
//   })
// );





export default productRouter;
