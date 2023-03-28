import { StatusCodes } from 'http-status-codes'
import Item from '../models/Item.js'
import { BadRequestError } from '../errors/index.js'

const getItemById = async (req, res) => {
  const itemId = req.params.id
  if (!itemId) {
    throw new BadRequestError('please provide itemId')
  }

  const item = await Item.findOne({ _id: itemId })
  res.status(StatusCodes.OK).json(item)
}

const queryItemsByProductId = async (req, res) => {
  const { productId } = req.query

  if (!productId) {
    throw new BadRequestError('please provide productId')
  }

  const items = await Item.find({ productId })
  res.status(StatusCodes.OK).json(items)
}

const queryItemsCountByProductId = async (req, res) => {
  const { productId } = req.query

  if (!productId) {
    throw new BadRequestError('please provide productId')
  }

  const count = (await Item.find({ productId })).length
  console.log(count)
  res.status(StatusCodes.OK).json({ count })
}

export { getItemById, queryItemsByProductId, queryItemsCountByProductId }