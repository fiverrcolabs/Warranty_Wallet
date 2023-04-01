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
  },
  issuerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'No user found'],
  },
  purchaseDate: {
    type: Date,
  },
})

UserSchema.pre('save', async function () {
  // TODO: create smart contract and store in db
  // needs another field to refer the smart contract
  this.purchaseDate = Date.now()
})

export default mongoose.model('Warranty', UserSchema)
