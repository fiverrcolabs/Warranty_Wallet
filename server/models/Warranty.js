import mongoose from 'mongoose'
import { createContract, useContract } from '../blockchain/utils.js'

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
  contractAddress: {
    type: String,
  },
  nickname: {
    type: String,
  }
})

UserSchema.pre('save', async function () {
  if (this.contractAddress) return
  const now = Date.now()
  this.purchaseDate = now
  const contract = await createContract(this.purchaseDate.toISOString())
  if (!contract._address) {
    throw new Error('contract not deployed')
  }
  this.contractAddress = contract._address
})

UserSchema.methods.verify = async function() {
  if (!this.contractAddress) {
    throw new Error('no contract found')
  }
  const result = await useContract(this.contractAddress, this.purchaseDate.toISOString())
  if (!result) {
    throw new Error('error in contract method')
  }
  return result
}

export default mongoose.model('Warranty', UserSchema)
