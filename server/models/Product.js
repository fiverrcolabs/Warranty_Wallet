import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: [true, 'Please provide productId'],
    unique: true,
  },
  productName: {
    type: String,
    required: [true, 'Please provide productName'],
  },
  imageData: { type: String },
  polices: { type: String },
  warrentyPeriod: {
    type: Number, // in months
    required: [true, 'Please provide website'],
    min: 0,
  },
})

export default mongoose.model('Product', UserSchema)
