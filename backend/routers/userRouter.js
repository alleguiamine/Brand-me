import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import data from "../data.js";
import User from "../models/userModel.js";
import { generateToken, isAuth } from "../utils.js";

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    //await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);


userRouter.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.json(users); // Send the user list as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

userRouter.delete(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (user) {
      await user.remove();
      res.status(200).send({ message: 'User deleted successfully' });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          image: user.image,

          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);


import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: './uploads/images',
  filename: function(req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Set file size limit to 1 MB
  fileFilter: function(req, file, callback) {
      checkFileType(file, callback);
  }
}).single('image');

function checkFileType(file, callback) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
      return callback(null, true);
  } else {
      callback('Error: Images only!');
  }
}


userRouter.post('/register', async (req, res) => {
  upload(req, res, async (err) => {
    try {
      if (err) {
        console.log(err);
        return res.status(500).send({ code: 500, message: 'Image upload error' });
      }
      
      const imagePath = req.file ? req.file.path : null;

      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        image: imagePath,
      });

      const createdUser = await user.save();
      res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser),
        image: createdUser.image,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({ code: 500, message: 'Internal server error' });
    }
  });
});

userRouter.get(
  "/details/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);
userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    }
  })
);
export default userRouter;








