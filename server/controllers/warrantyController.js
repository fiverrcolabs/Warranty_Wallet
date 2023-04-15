import { StatusCodes } from 'http-status-codes'
import moment from 'moment'
import Warranty from '../models/Warranty.js'
import Manufacturer from '../models/Manufacturer.js'
import { BadRequestError } from '../errors/index.js'
import Item from '../models/Item.js'

const getWarrantyById = async (req, res) => {
  const warrantyId = req.params.warrantyId
  if (!warrantyId) {
    throw new BadRequestError('please provide warrantyId')
  }

  const warrantyExist = await Warranty.findOne({ _id: warrantyId }).populate({
    path: 'itemId',
    select: 'productId',
    populate: {
      path: 'productId'
    }
  }).lean()

  if (!warrantyExist) {
    throw new BadRequestError(`warranty with ${warrantyId} does not exist`)
  }

  const manufacturer = await Manufacturer.findOne({ products: { $in: [warrantyExist.itemId.productId] } })

  warrantyExist.manufacturer = manufacturer.userId

  res.status(StatusCodes.OK).json(warrantyExist)
}

const getWarrantyByItemId = async (req, res) => {
  const itemId = req.query.itemId
  if (!itemId) {
    throw new BadRequestError('please provide itemId')
  }

  const warranty = await Warranty.findOne({ itemId }).populate({ path: 'itemId', select: 'productId', populate: { path: 'productId', select: 'polices' } })

  if (req.user.role === 'CONSUMER') {
    console.log(itemId, warranty)
    if (warranty) {
      res.status(StatusCodes.OK).json(warranty)
    } else {
      throw new BadRequestError('provided itemId has no warranty')
    }
  } else if (req.user.role === 'RETAILER') {
    if (warranty) {
      throw new BadRequestError('provided itemId already has a warranty')
    } else {
      const item = await Item.findOne({ _id: itemId }, { productId: 1 }).populate({ path: 'productId', select: 'polices' })
      console.log(item)
      res.status(StatusCodes.OK).json(item)
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
        select: 'warrentyPeriod productName',
      },
    })
  } else if (req.user.role === 'RETAILER') {
    warranties = await Warranty.find({ issuerId: req.user.userId }).populate({
      path: 'itemId',
      select: 'productId',
      populate: {
        path: 'productId',
        select: 'warrentyPeriod productName',
      },
    })
  } else if (req.user.role === 'MANUFACTURER') {
    const manufacturer = await Manufacturer.findOne({ userId: req.user.userId })
    const manufacturerProducts = manufacturer.products
    warranties = await Warranty.aggregate([
      {
        $lookup: {
          from: 'items',
          localField: 'itemId',
          foreignField: '_id',
          as: 'itemId',
        },
      },
      {
        $addFields: {
          itemId: { $arrayElemAt: ["$itemId", 0] }
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: 'itemId.productId',
          foreignField: '_id',
          as: 'productId',
        },
      },
      {
        $addFields: {
          productId: { $arrayElemAt: ["$productId", 0] }
        }
      },
      {
        $match: {
          'productId._id': {
            $in: manufacturerProducts,
          },
        },
      },
      {
        $project: {
          'itemId.qr': 0,
          'productId.imageData': 0
        },
      },
    ])

    warranties.forEach((warranty) => {
      warranty.itemId.productId = warranty.productId
      delete warranty.productId
    })
  }

  warranties.forEach((warranty) => {
    const expirationDate = moment(warranty.purchaseDate).add(warranty.itemId.productId.warrentyPeriod, 'months').toDate();
    const currentDate = new Date();

    if (expirationDate < currentDate) {
      warranty.state = 'EXPIRED'
    } else if (!warranty.customerId) {
      warranty.state = 'INACTIVE'
    } else {
      warranty.state = 'ACTIVE'
    }
  })

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
  const { warrantyId, nickname } = req.body
  const warranty = await Warranty.findOne({ _id: warrantyId })

  if (!warranty) {
    throw new BadRequestError(`${warrantyId} has no warranty`)
  }
  if (!nickname) {
    throw new BadRequestError(`${nickname} is required`)
  }
  if (warranty.customerId) {
    throw new BadRequestError(`${warrantyId} already assigned`)
  }

  warranty.customerId = req.user.userId
  warranty.nickname = nickname
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
