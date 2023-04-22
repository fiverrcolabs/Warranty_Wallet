import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  productId: {  // Product._id
    type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: [true, 'No product found'],
  },
  qr: {
    type: String,
  },
  createdDate: {
    type: Date,
  }
})

export default mongoose.model('Item', UserSchema)
