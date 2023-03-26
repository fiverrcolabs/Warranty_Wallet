import { StatusCodes } from 'http-status-codes'
import Product from '../models/Product.js'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'

const getAllProducts = async (req, res, next) => {
  const products = await Product.find()
  res.status(StatusCodes.OK).json(products)
}

const getProductById = async (req, res, next) => {
  const productId = req.params.productId

  if (!productId) {
    throw new BadRequestError('please provide productId')
  }

  const product = await Product.findOne({ productId })
  res.status(StatusCodes.OK).json(product)
}

const addProduct = async (req, res, next) => {
  const {
    productId,
    productName,
    polices,
    warrentyPeriod,
    imageData,
    imageType,
  } = req.body

  if (!productId || !productName || !warrentyPeriod) {
    throw new BadRequestError('please provide all values')
  }

  const productAlreadyExists = await Product.findOne({ productId })

  if (productAlreadyExists) {
    throw new BadRequestError(`Provided product ${productId} already in use`)
  }

  const product = await Product.create({
    productId,
    productName,
    polices,
    warrentyPeriod,
    imageData,
    imageType,
  })

  res.status(StatusCodes.CREATED).json(product)
}

export { getAllProducts, addProduct, getProductById }
