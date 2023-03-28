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
  },
  manufacturerFriends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  manufacturerRequests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
  // subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription', required: [true, 'No subscription found'] },
})

export default mongoose.model('Retailer', UserSchema)
