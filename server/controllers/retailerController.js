import { StatusCodes } from 'http-status-codes'
import Manufacturer from '../models/Manufacturer.js'
import Retailer from '../models/Retailer.js'
import { BadRequestError } from '../errors/index.js'

const getManufacturerFriends = async (req, res) => {
  const manufacturerFriends = await Retailer.findOne({
    userId: req.user.userId,
  })
    .populate('manufacturerFriends')
    .select('manufacturerFriends')
  res.status(StatusCodes.OK).json(manufacturerFriends)
}

const getManufacturerRequests = async (req, res) => {
  const manufacturerRequests = await Retailer.findOne({
    userId: req.user.userId,
  })
    .populate('manufacturerRequests')
    .select('manufacturerRequests')
  res.status(StatusCodes.OK).json(manufacturerRequests)
}

const getNonManufacturerFriends = async (req, res) => {
  const queryRetailer = await Retailer.findOne({
    userId: req.user.userId,
  }).select('manufacturerFriends')
  const manufacturerFriendIds = queryRetailer.manufacturerFriends
  const manufacturerFriends = await Manufacturer.find({
    _id: { $nin: manufacturerFriendIds },
  }).populate('userId')
  res.status(StatusCodes.OK).json(manufacturerFriends)
}

const sendRetailerRequest = async (req, res) => {
  const { userId } = req.query
  if (!userId) {
    throw new BadRequestError('please provide userId')
  }

  const manufacturerExists = await Retailer.count({ userId })
  if (!manufacturerExists) {
    throw new BadRequestError('user not found')
  }

  const manufacturerSentRequest = await Retailer.count({
    _id: req.user.userId,
    manufacturerRequests: userId,
  })
  if (manufacturerSentRequest > 0) {
    throw new BadRequestError('manufacturer has already sent a request')
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

  const removeManufacturerRequest = await Manufacturer.findOneAndUpdate(
    {
      userId: userId,
    },
    { $pull: { retailerRequests: req.user.userId } },
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
  res.status(StatusCodes.OK).json(approveManufacturerRequest)
}

const getRetailerSentRequests = async (req, res) => {
  const getRetailerSentRequests = await Manufacturer.find(
    {
      retailerRequests: { $in: [req.user.userId] },
    },
  )
  res.status(StatusCodes.OK).json(getRetailerSentRequests)
}

export {
  getManufacturerFriends,
  getNonManufacturerFriends,
  getManufacturerRequests,
  sendRetailerRequest,
  removeManufacturerRequest,
  approveManufacturerRequest,
  getRetailerSentRequests,
}
