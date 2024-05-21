import mongoose from 'mongoose';
const offerSchema = new mongoose.Schema({
  offerName: { type: String, },
  remise : { type: Number, },
  image: { type: String },

}, { timestamps: true });

const Offer = mongoose.model('Offer', offerSchema);

export default Offer;
