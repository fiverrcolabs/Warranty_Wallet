import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import User from '../models/User.js'
import Manufacturer from '../models/Manufacturer.js'
import Retailer from '../models/Retailer.js'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'
// import Subscription from '../models/Subscription.js'

const register = async (req, res, next) => {
  console.log(req.body)
  const { email, password, role } = req.body

  if (!email || !password) {
    throw new BadRequestError('please provide all values')
  }

  const userAlreadyExists = await User.findOne({ email })

  if (userAlreadyExists) {
    throw new BadRequestError(`${email} already in use`)
  }

  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const users = await User.create([{ email, password, role }], { session })
    const user = users[0]

    if (role === 'MANUFACTURER') {
      const { company, website } = req.body
      // const subscriptionObject = await Subscription.findOne({ type: subscription })

      const manufacturers = await Manufacturer.create(
        [
          {
            userId: user._id,
            company,
            website,
            // subscription: subscriptionObject._id,
          },
        ],
        { session }
      )
    } else if (role === 'RETAILER') {
      const { company, website } = req.body
      // const subscriptionObject = await Subscription.findOne({ type: subscription })
      const retailer = await Retailer.create(
        [
          {
            userId: user._id,
            company,
            website,
            // subscription: subscriptionObject._id,
          },
        ],
        { session }
      )
    }

    const token = user.createJWT()

    await session.commitTransaction()

    res.status(StatusCodes.CREATED).json({
      user: {
        email: user.email,
        role: user.role,
      },
      token,
    })
  } catch (error) {
    await session.abortTransaction()
    next(error)
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('please provide all values')
  }

  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid Credentials')
  }

  const token = user.createJWT()

  user.password = undefined
  // user.role = undefined
  res.status(StatusCodes.OK).json({ user, token })
}

const getProfile = async (req, res, next) => {
  let user = await User.findOne({ _id: req.user.userId }).lean()
  if (req.user.role === 'MANUFACTURER') {
    const manufacturer = await Manufacturer.findOne({ userId: req.user.userId }).lean()
    user = { ...user, ...manufacturer }
  } else if (req.user.role === 'RETAILER') {
    const retailer = await Retailer.findOne({ userId: req.user.userId }).lean()
    user = { ...user, ...retailer }
  }
  res.status(StatusCodes.OK).json(user)
}

export { register, login, getProfile }
