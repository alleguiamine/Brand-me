import multer from "multer";
import path from "path";
import productRouter from "./productRouter";

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
            res.send({ code: 500, message: 'Image upload error' });
        } else {
            // Check if a file was uploaded
            const imagePath = req.file ? req.file.path : null;

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
                res.send({ code: 200, message: 'Signup success' });
            }).catch((err) => {
                console.log(err);
                res.send({ code: 500, message: 'Signup error' });
            });
        }
    });
});

