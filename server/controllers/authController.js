import { StatusCodes } from "http-status-codes"
import User from "../models/User.js"
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js"

const register = async (req, res, next) => {
    const { email, password, role } = req.body
    if (!email || !password) {
        throw new BadRequestError('please provide all values')
    }

    const userAlreadyExists = await User.findOne({ email })

    if (userAlreadyExists) {
        throw new BadRequestError(`${email} already in use`)
    }

    const user = await User.create({ email, password, role })
    const token = user.createJWT()

    res.status(StatusCodes.CREATED).json({ user: {
        email: user.email,
    }, token })
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
    user.role = undefined
    res.status(StatusCodes.OK).json({ user, token })
}

export {
    register,
    login
}