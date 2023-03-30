import { StatusCodes } from 'http-status-codes'
import Warranty from '../models/Warranty.js'
import { BadRequestError } from '../errors/index.js'

const getWarrantyById = async (req, res) => {
  const warrantyId = req.params.warrantyId
  if (!warrantyId) {
    throw new BadRequestError('please provide warrantyId')
  }

  const warranty = await Warranty.findOne({ _id: warrantyId })
  res.status(StatusCodes.OK).json(warranty)
}

const getWarrantyByItemId = async (req, res) => {
  const itemId = req.query.itemId
  if (!itemId) {
    throw new BadRequestError('please provide itemId')
  }

  const warranty = await Warranty.findOne({ itemId })

  if (req.user.role === 'CONSUMER') {
    if (warranty) {
      res.status(StatusCodes.OK).json(warranty)
    } else {
      throw new BadRequestError('provided itemId has no warranty')
    }
  } else if (req.user.role === 'RETAILER') {
    if (warranty) {
      throw new BadRequestError('provided itemId already has a warranty')
    } else {
      res.status(StatusCodes.OK).json(warranty)
    }
  }
}

const queryWarranty = async (req, res) => {
  const { itemId, customerId, purchaseDate, issuerId } = req.query
  const warrenties = await Warranty.find({
    itemId,
    customerId,
    issuerId,
    purchaseDate,
  })
  res.status(StatusCodes.OK).json(warrenties)
}

const getAllWarranties = async (req, res) => {
  let warranties = []
  if (req.user.role === 'CONSUMER') {
    warranties = await Warranty.find({ customerId: req.user.userId }).populate({
      path: 'itemId',
      select: 'productId',
      populate: {
        path: 'productId',
        select: 'productName warrentyPeriod polices',
      },
    })
  } else if (req.user.role === 'RETAILER') {
    warranties = await Warranty.find({ issuerId: req.user.userId })
  }

  res.status(StatusCodes.OK).json(warranties)
}

const createWarranty = async (req, res) => {
  const { itemId } = req.body

  if (!itemId) {
    throw new BadRequestError('please provide all values')
  }

  const warrantyExists = await Warranty.findOne({ itemId })

  if (warrantyExists) {
    throw new BadRequestError(`${itemId} already has a warrenty`)
  }

  const warranty = await Warranty.create({ itemId, issuerId: req.user.userId })

  res.status(StatusCodes.OK).json(warranty)
}

const assignSelf = async (req, res) => {
  const { warrantyId } = req.body
  const warranty = await Warranty.findOne({ _id: warrantyId })

  if (!warranty) {
    throw new BadRequestError(`${warrantyId} has no warrenty`)
  }

  warranty.customerId = req.user.userId
  await warranty.save()
  res.status(StatusCodes.OK).json(warranty)
}

export {
  getWarrantyById,
  queryWarranty,
  getAllWarranties,
  createWarranty,
  getWarrantyByItemId,
  assignSelf,
}
