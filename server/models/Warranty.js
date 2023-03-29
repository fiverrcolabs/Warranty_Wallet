import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: [true, 'No product item found'],
    unique: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'No user found'],
  },
  issuerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'No user found'],
  },
  purchaseDate: {
    type: Date,
    required: [true, 'Please provide purchase date'],
  },
})

UserSchema.pre('save', async function () {
  this.purchaseDate = Date.now()
})

export default mongoose.model('Warranty', UserSchema)
