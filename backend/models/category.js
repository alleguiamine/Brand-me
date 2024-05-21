import mongoose from "mongoose";

const   Categoryschema = new mongoose.Schema(
  {
    name: { type: String },
  
  },
  {
    timestamps: true,
  }
);
const Category = mongoose.model("category", Categoryschema);

export default Category;
