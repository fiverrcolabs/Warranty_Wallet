import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  itemId: {
    // Item._id
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: [true, 'No product item found'],
    unique: true,
  },
  customerId: {
    // Item._id
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'No user found'],
  },
  purchaseDate: {
    type: Date,
    required: [true, 'Please provide purchase date'],
  },
  status: {
    type: String,
    enum: ['NEW', 'IN_PROGRESS', 'REJECTED', 'COMPLETED', 'RESOLVED'],
    default: 'NEW',
  },
})

UserSchema.pre('save', async function () {
  this.purchaseDate = Date.now()
})

export default mongoose.model('Warrenty', UserSchema)
