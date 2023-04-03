import mongoose from 'mongoose'

const ChatSchema = new mongoose.Schema({

  
    claimId: { type: mongoose.Schema.Types.ObjectId, 
        ref: 'Claim', 
        required: [true, 'No claim found'],
        // unique: [true, 'Claim Id must be unique'], 
    },

    chats: [{
        msg: {
            type: String,
        },
        time: {
            type: Date,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',    
        },
        role: {
            type: String, 
            enum: ['MANUFACTURER', 'RETAILER', 'CONSUMER']
        }
    }],


})

export default mongoose.model('Chat', ChatSchema)
