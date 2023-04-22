import { StatusCodes } from 'http-status-codes'
import Manufacturer from '../models/Manufacturer.js'
import Retailer from '../models/Retailer.js'
import User from '../models/User.js'
import { BadRequestError } from '../errors/index.js'

const getManufacturerFriends = async (req, res) => {
  const manufacturerFriends = (await Retailer.findOne({
    userId: req.user.userId,
  })
    .populate('manufacturerFriends')
    .select('manufacturerFriends')).manufacturerFriends
  const manufacturers = await User.aggregate([
    {
      $match: {
        _id: { $in: manufacturerFriends.map(user => user._id) }
      }
    },
    {
      $lookup: {
        from: 'manufacturers',
        localField: '_id',
        foreignField: 'userId',
        as: 'manufacturer'
      }
    },
    {
      $addFields: {
        retailer: { $arrayElemAt: ["$manufacturer", 0] },
      }
    }, 
    {
      $unwind: '$manufacturer'
    },
    {
      $project: {
        email: 1,
        _id: '$manufacturer._id',
        userId: '$manufacturer.userId',
        company: '$manufacturer.company',
        website: '$manufacturer.website',
        __v: '$manufacturer.__v'
      }
    },
  ])
  res.status(StatusCodes.OK).json(manufacturers)
}

const getManufacturerRequests = async (req, res) => {
  const manufacturerRequests = (await Retailer.findOne({
    userId: req.user.userId,
  })
    .populate('manufacturerRequests')
    .select('manufacturerRequests')).manufacturerRequests
  const manufacturers = await User.aggregate([
    {
      $match: {
        _id: { $in: manufacturerRequests.map((user) => user._id) },
      },
    },
    {
      $lookup: {
        from: 'manufacturers',
        localField: '_id',
        foreignField: 'userId',
        as: 'manufacturer',
      },
    },
    {
      $addFields: {
        retailer: { $arrayElemAt: ["$manufacturer", 0] },
      }
    }, 
    {
      $unwind: '$manufacturer'
    },
    {
      $project: {
        email: 1,
        _id: '$manufacturer._id',
        userId: '$manufacturer.userId',
        company: '$manufacturer.company',
        website: '$manufacturer.website',
        __v: '$manufacturer.__v'
      }
    },
  ])
  res.status(StatusCodes.OK).json(manufacturers)
}

const getNonManufacturerFriends = async (req, res) => {
  const queryRetailer = await Retailer.findOne({
    userId: req.user.userId,
  }).select('manufacturerFriends')
  const manufacturerFriendIds = queryRetailer.manufacturerFriends
  const manufacturerFriends = await Manufacturer.aggregate([
    {
      $match: {
        userId: { $nin: manufacturerFriendIds },
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $addFields: {
        user: { $arrayElemAt: ["$user", 0] },
      }
    }, 
    {
      $unwind: '$user'
    },
    {
      $project: {
        email: '$user.email',
        _id: 1,
        userId: '$user._id',
        company: 1,
        website: 1,
        __v: 1
      }
    },
  ])
  res.status(StatusCodes.OK).json(manufacturerFriends)
}

const sendManufacturerRequest = async (req, res) => {
  const { userId } = req.query
  if (!userId) {
    throw new BadRequestError('please provide userId')
  }

  const manufacturerExists = await Manufacturer.count({ userId })
  if (!manufacturerExists) {
    throw new BadRequestError('user not found')
  }

  const manufacturerSentRequest = await Retailer.count({
    userId: req.user.userId,
    manufacturerRequests: userId,
  })
  if (manufacturerSentRequest > 0) {
    throw new BadRequestError('manufacturer has already sent a request')
  }

  const manufacturerIsAlreadyFriend = await Retailer.count({
    userId: req.user.userId,
    manufacturerFriends: userId,
  })
  
  if (manufacturerIsAlreadyFriend > 0) {
    throw new BadRequestError('manufacturer is already a friend')
  }

  const addManufacturerRequest = await Manufacturer.findOneAndUpdate(
    {
      userId: userId,
      retailerRequests: { $ne: req.user.userId },
    },
    { $addToSet: { retailerRequests: req.user.userId } },
    { new: true }
  )
  res.status(StatusCodes.OK).json(addManufacturerRequest)
}

const removeManufacturerRequest = async (req, res) => {
  const { userId } = req.query
  if (!userId) {
    throw new BadRequestError('please provide userId')
  }

  const manufacturerExists = await Manufacturer.count({ userId })
  if (!manufacturerExists) {
    throw new BadRequestError('user not found')
  }

  const removeManufacturerRequest = await Retailer.findOneAndUpdate(
    {
      userId: req.user.userId,
    },
    { $pull: { manufacturerRequests: userId } },
    { new: true }
  )
  res.status(StatusCodes.OK).json(removeManufacturerRequest)
}

const approveManufacturerRequest = async (req, res) => {
  const { userId } = req.query
  if (!userId) {
    throw new BadRequestError('please provide userId')
  }

  const manufacturerExists = await Manufacturer.count({ userId })
  if (!manufacturerExists) {
    throw new BadRequestError('user not found')
  }

  const manufacturerRequest = await Retailer.count({
    userId: req.user.userId,
    manufacturerRequests: userId,
  })

  if (manufacturerRequest === 0) {
    throw new BadRequestError('no request found')
  }

  const approveManufacturerRequest = await Retailer.findOneAndUpdate(
    {
      userId: req.user.userId,
      manufacturerRequests: userId,
    },
    {
      $pull: { manufacturerRequests: userId },
      $addToSet: { manufacturerFriends: userId },
    },
    { new: true }
  )

  const addRetailerToManufacturerFriends = await Manufacturer.findOneAndUpdate(
    {
      userId: userId,
    },
    {
      $addToSet: { retailerFriends: req.user.userId },
    },
    { new: true }
  )
  res.status(StatusCodes.OK).json(approveManufacturerRequest)
}

const getRetailerSentRequests = async (req, res) => {
  const getRetailerSentRequests = await Manufacturer.find({
    retailerRequests: { $in: [req.user.userId] },
  })
  res.status(StatusCodes.OK).json(getRetailerSentRequests)
}

export {
  getManufacturerFriends,
  getNonManufacturerFriends,
  getManufacturerRequests,
  sendManufacturerRequest,
  removeManufacturerRequest,
  approveManufacturerRequest,
  getRetailerSentRequests,
}
