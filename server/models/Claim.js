import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  warrantyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Warranty',
    required: [true, 'No warranty found'],
    unique: true,
  },
  handler: {
    type: String,
    enum: ['RETAILER', 'MANUFACTURER'],
    default: 'RETAILER',
  },
  status: {
    type: String,
    enum: ['NEW', 'IN_PROGRESS', 'REJECTED', 'COMPLETED', 'RESOLVED'],
    default: 'NEW',
  },
})

export default mongoose.model('Claim', UserSchema)
