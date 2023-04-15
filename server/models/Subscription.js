import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['GOLD', 'SILVER', 'DEFAULT'],
    default: 'DEFAULT'
  },
})

export default mongoose.model('Subscription', UserSchema)
