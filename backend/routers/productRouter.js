import express from "express";
import expressAsyncHandler from "express-async-handler";
// import data from "../data.js";
import Product from "../models/productModel.js";

import Category from "../models/category.js"

import Offer from "../models/offre.js";

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
  "/by-category/:categorie",
  expressAsyncHandler(async (req, res) => {
    const { category } = req.params;
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


import path from "path";


const storage = multer.diskStorage({
    destination: './uploads/images',
    filename: function(req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
  
// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000000 }, // set the file size limit (in bytes)
    fileFilter: function(req, file, callback) {
        checkFileType(file, callback);
    }
}).single('image');

// Check file type
function checkFileType(file, callback) {
    // Allowed extensions
    const filetypes = /jpeg|jpg|png|gif/;
    // Check extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check MIME type
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return callback(null, true);
    } else {
        callback('Error: Images only!');
    }
}

// Assumant que `image` est un routeur Express déjà configuré ailleurs dans votre application
productRouter.post('/products', async (req, res) => {
  // Handle image upload using Multer
  upload(req, res, (err) => {
      if (err) {
          console.log(err);
          res.status(500).send({ code: 500, message: 'Image upload error' });
      } else {
          // Check if a file was uploaded
          if (!req.file) {
              console.log("No file uploaded");
              res.status(400).send({ code: 400, message: 'No file uploaded' });
              return;
          }

          const imagePath = req.file.path;
          console.log(imagePath);
          // Save user data to database
          const newProduct = new Product({
              name :req.body.name,
              image: imagePath, // Use the path of the uploaded image
              brand : req.body.brand,
              category : req.body.category,
              description : req.body.description,
              price : req.body.price ,
              countInStock : req.body.countInStock,
              rating : req.body.rating,
              numReviews : req.body.numReviews
          });

          newProduct.save().then(() => {
              res.send({ code: 200, message: 'Product created successfully' });
          }).catch((err) => {
              console.log(err);
              res.status(500).send({ code: 500, message: 'Failed to create product' });
          });
          
      }
  });
});





import multer from "multer";

productRouter.get('/getproduct/n', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





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


// Assumant que `image` est un routeur Express déjà configuré ailleurs dans votre application
productRouter.post('/categories', async (req, res) => {
     

          const newCategorie = new Category({
              name :req.body.categoryName,
             
          });

          newCategorie.save().then(() => {
              res.send({ code: 200, message: 'Product created successfully' });
          }).catch((err) => {
              console.log(err);
              res.status(500).send({ code: 500, message: 'Failed to create product' });
          });
      }

);

productRouter.get('/affiche/categorie', async (req, res) => {
  try {
    // Fetch all categories from the database
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


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


productRouter.get('/getimagebyid/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Assuming 'image' field contains the file path of the image
    const imagePath = product.image;
    
    // You can also send the image file directly if it's stored in your server
    // res.sendFile(imagePath);

    // Or you can send the image data as a response
    res.json({ image: imagePath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



import nodemailer from 'nodemailer';
import User from "../models/userModel.js";

productRouter.post('/offers', async (req, res) => {
  // Handle image upload using Multer
  upload(req, res, async (err) => {
    try {
      if (err) {
        console.log(err);
        return res.status(500).send({ code: 500, message: 'Image upload error' });
      }

      // Check if a file was uploaded
      if (!req.file) {
        console.log("No file uploaded");
        return res.status(400).send({ code: 400, message: 'No file uploaded' });
      }

      const imagePath = req.file.path;
      console.log(imagePath);

      // Calculate the new price with discount
      const remise = req.body.Remise;
      const newPrice = req.body.price * (1 - (remise / 100));

      // Update the price in the product model
      await Product.findOneAndUpdate({ name: req.body.name }, { price: newPrice });

      // Create a new offer instance
  

      // Send success response
      res.status(200).json({ code: 200, message: 'Offer created successfully' });

      // Fetch all user emails
      const users = await User.find({}, 'email');

      // Create nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'Amineallegui09@gmail.com',
          pass: 'csxh iyua selr aevl'
        }
      });

      // Iterate through users and send email
      users.forEach(async (user) => {
        try {
          await transporter.sendMail({
            from: 'Amineallegui09@gmail.com',
            to: user.email,
            subject: 'New Offer Available!',
            text: 'Check out our latest offer on our website.'
          });
          console.log(`Email sent to ${user.email}`);
        } catch (error) {
          console.error(`Error sending email to ${user.email}:`, error);
        }
      });
    } catch (error) {
      console.error('Error adding offer:', error);
      res.status(500).json({ code: 500, message: 'Internal Server Error' });
    }
  });
});











export default productRouter;
