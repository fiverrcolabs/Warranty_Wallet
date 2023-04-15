import { StatusCodes } from 'http-status-codes'
import Product from '../models/Product.js'
import Manufacturer from '../models/Manufacturer.js'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'

const getAllProducts = async (req, res, next) => {
  const queryManufacturer = await Manufacturer.findOne({
    userId: req.user.userId,
  }).select('products')
  const productIds = queryManufacturer.products

  const products = await Product.find({ _id: { $in: productIds } })
  res.status(StatusCodes.OK).json(products)
}

const getProductById = async (req, res, next) => {
  const productId = req.params.productId

  if (!productId) {
    throw new BadRequestError('please provide productId')
  }

  const product = await Product.findOne({ _id: productId })
  res.status(StatusCodes.OK).json(product)
}

const addProduct = async (req, res, next) => {
  const { productId, productName, polices, warrentyPeriod, imageData } =
    req.body

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
  })

  const queryManufacturer = await Manufacturer.findOneAndUpdate(
    { userId: req.user.userId },
    { $push: { products: product._id } },
    { new: false }
  )

  res.status(StatusCodes.CREATED).json(product)
}

export { getAllProducts, addProduct, getProductById }
