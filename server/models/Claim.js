import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  warrantyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Warranty',
    required: [true, 'No warranty found'],
    unique: true,
  },
  assignee: {
    type: String,
  },
  taskTime: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['NEW', 'IN_PROGRESS', 'REJECTED', 'COMPLETED', 'RESOLVED'],
    default: 'NEW',
  },
  warrantyServiceProvider: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Please provide userId'],
      ref: 'User',
    },
    role: {
      type: String,
      enum: ['MANUFACTURER', 'RETAILER'],
      default: 'RETAILER',
    }
  },
})

export default mongoose.model('Claim', UserSchema)
