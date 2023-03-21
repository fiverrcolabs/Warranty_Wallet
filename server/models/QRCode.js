import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  // TODO
  //   productId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'User',
  //     required: [true, 'No user found'],
  //   },
  productId: {
    type: String,
    required: [true, 'Please provide product id for the QR code'],
  },
  code: {
    type: String,
    required: [true, 'Please provide base64 representation of the QR code'],
  },
})

export default mongoose.model('QRCode', UserSchema)
