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
    console.log(claimId)

    if (!claimId) {
        throw new BadRequestError('please provide claim id')
    }
    let chat = await Chat.findOne({ claimId: claimId })

    res.status(StatusCodes.OK).json(chat)
}

const saveChat = async (req, res) => {

    const { claimId, userId, msg } = req.body
    console.log(claimId, userId, msg)
    if (!claimId || !userId || !msg) {
        throw new BadRequestError('please provide all values')
    }

    const user = await User.findOne({ _id:userId })
    if (!user) {
        throw new UnAuthenticatedError('Invalid Credentials')
    }

    let chat = await Chat.findOne({ claimId: claimId })

    if (!chat) {
        console.log(user)

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
        console.log(" fond")
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