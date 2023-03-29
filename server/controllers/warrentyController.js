import { StatusCodes } from 'http-status-codes'
import Warranty from '../models/Warranty.js'
import { BadRequestError } from '../errors/index.js'

const getWarrantyById = async (req, res) => {
  const warrantyId = req.params.warrentyId
  if (!warrantyId) {
    throw new BadRequestError('please provide warrantyId')
  }

  const warranty = await Warranty.findOne({ _id: warrantyId })
  res.status(StatusCodes.OK).json(warranty)
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
    warranties = await Warranty.find({ customerId: req.user.userId }).populate(
      { path: 'itemId', select: 'productId', populate: {
        path: 'productId', select: 'productName warrentyPeriod polices'
      }}
    )
  } else {
    warranties = await Warranty.find({ issuerId: req.user.userId })
  }

  res.status(StatusCodes.OK).json(warranties)
}

const createWarranty = async (req, res) => {
  const { itemId, customerId } = req.body

  if (!itemId || !customerId) {
    throw new BadRequestError('please provide all values')
  }

  const warrantyExists = await Warranty.findOne({ itemId })

  if (warrantyExists) {
    throw new BadRequestError(`${itemId} already has a warrenty`)
  }

  const warranty = await Warranty.create({ itemId, customerId, issuerId: req.user.userId })

  res.status(StatusCodes.OK).json(warranty)
}

export { getWarrantyById, queryWarranty, getAllWarranties, createWarranty }
