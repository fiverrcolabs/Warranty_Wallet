import { StatusCodes } from 'http-status-codes'
import moment from 'moment'
import Chat from '../models/Chat.js'
import User from '../models/User.js'
import Claim from '../models/Claim.js'
import Warranty from '../models/Warranty.js'
import Manufacturer from '../models/Manufacturer.js'
import { BadRequestError } from '../errors/index.js'



const getChatByClaimId = async (req, res) => {

    const { claimId } = req.query

    if (!claimId) {
        throw new BadRequestError('please provide claim id')
    }
    let chat = await Chat.findOne({ claimId: claimId })

    res.status(StatusCodes.OK).json(chat)
}

const saveChat = async (req, res) => {

    const { claimId, userId, msg } = req.body
    if (!claimId || !userId || !msg) {
        throw new BadRequestError('please provide all values')
    }

    const user = await User.findOne({ _id:userId })
    if (!user) {
        throw new UnAuthenticatedError('Invalid Credentials')
    }

    let chat = await Chat.findOne({ claimId: claimId })

    if (!chat) {

        const addChatArray = await Chat.create(

            {
                claimId: claimId,
                chats: [{
                    msg: msg,
                    time: Date.now(),
                    userId: userId,
                    role: user.role
                }]

            })
    } else {
        const addChatArray = await Chat.findOneAndUpdate(
            {
                claimId: claimId,
                
            },
            { $addToSet: { chats: {
                msg: msg,
                time: Date.now(),
                userId: userId,
                role: user.role
            } } },
            { new: true }
        )
    }

    res.status(StatusCodes.OK).json(chat)
}

export {

    getChatByClaimId,
    saveChat

}