import { StatusCodes } from 'http-status-codes'
import Warrenty from '../models/Warrenty.js'
import { BadRequestError } from '../errors/index.js'

const getWarrentyById = async (req, res) => {
  const warrentyId = req.params.id
  if (!warrentyId) {
    throw new BadRequestError('please provide warrentyId')
  }

  const warrenty = await Warrenty.findOne({ _id: warrentyId })
  res.status(StatusCodes.OK).json(warrenty)
}

const queryWarrenty = async (req, res) => {
  const { itemId, customerId, purchaseDate, status } = req.query
  const warrenties = await Warrenty.find({
    itemId,
    customerId,
    purchaseDate,
    status,
  })
  res.status(StatusCodes.OK).json(warrenties)
}

const getAllWarrenties = async (req, res) => {
  const warrenties = await Warrenty.find(itemId)
  res.status(StatusCodes.OK).json(warrenties)
}

const createWarrenty = async (req, res) => {
  const { itemId, customerId } = req.body

  if (!itemId || !customerId) {
    throw new BadRequestError('please provide all values')
  }

  const warrentyExists = await Warrenty.findOne({ itemId })

  if (warrentyExists) {
    throw new BadRequestError(`${itemId} already has a warrenty`)
  }

  const warrenty = await Warrenty.create({ itemId, customerId })

  res.status(StatusCodes.OK).json(warrenty)
}

export { getWarrentyById, queryWarrenty, getAllWarrenties, createWarrenty }
