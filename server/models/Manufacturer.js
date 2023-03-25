import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'No user found'] },
  company: {
    type: String,
    required: [true, 'Please provide company'],
  },
  website: {
    type: String,
    required: [true, 'Please provide website'],
  }
  // subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription', required: [true, 'No subscription found'] },
})

export default mongoose.model('Manufacturer', UserSchema)
