import { StatusCodes } from 'http-status-codes'
import moment from 'moment'
import Claim from '../models/Claim.js'
import Warranty from '../models/Warranty.js'
import Manufacturer from '../models/Manufacturer.js'
import { BadRequestError } from '../errors/index.js'

const createClaim = async (req, res) => {
    const { warrantyId, description } = req.body

    if (!warrantyId) {
        throw new BadRequestError('please provide warrantyId')
    }

    const warrantyExists = await Warranty.findOne({ _id: warrantyId }).populate({ path: 'itemId', select: 'productId', populate: { path: 'productId', select: 'warrentyPeriod' }})

    if (!warrantyExists) {
        throw new BadRequestError(`warranty does not exist by ${warrantyId}`)
    }

    if (req.user.userId != warrantyExists.customerId) {
        throw new BadRequestError(`you are not authorized to claim warranty by ${warrantyId}`)
    }

    const expirationDate = moment(warrantyExists.purchaseDate).add(warrantyExists.itemId.productId.warrentyPeriod, 'months').toDate();
    const currentDate = new Date();
    if (expirationDate<currentDate) {
        throw new BadRequestError(`warranty by ${warrantyId} is expired`)
    }

    // TODO: verify with blockchain
    const claim = await Claim.create({ warrantyId, description, warrantyServiceProvider: { userId: warrantyExists.issuerId } })

    res.status(StatusCodes.OK).json(claim)
}

const fillClaim = async (req, res) => {
    const { claimId, assignee, taskTime, status } = req.body

    if (!claimId) {
        throw new BadRequestError('please provide all values')
    }

    let claimExists = await Claim.findOne({ _id: claimId })

    if (!claimExists) {
        throw new BadRequestError(`claim does not exist by ${claimId}`)
    }

    if (req.user.userId != claimExists.warrantyServiceProvider.userId) {
        throw new BadRequestError(`you are not authorized to fill the claim by ${claimId}`)
    }

    claimExists.assignee = assignee
    claimExists.taskTime = taskTime
    claimExists.status = status
    const claim = await claimExists.save()

    res.status(StatusCodes.OK).json(claim)
}

const forwardClaim = async (req, res) => {
    const { claimId } = req.body

    if (!claimId) {
        throw new BadRequestError('please provide claimId')
    }

    const claimExists = await Claim.findOne({ _id: claimId }).populate({ path: 'warrantyId', select: 'itemId', populate: { path: 'itemId', select: 'productId' } })
    const productId = claimExists.warrantyId.itemId.productId

    if (!claimExists) {
        throw new BadRequestError(`claim does not exist by ${claimId}`)
    }

    if (req.user.userId != claimExists.warrantyServiceProvider.userId) {
        throw new BadRequestError(`you are not authorized to forward the claim by ${claimId}`)
    }

    if (claimExists.warrantyServiceProvider.role === 'MANUFACTURER') {
        throw new BadRequestError(`claim by ${claimId} already forwarded`)
    }

    const manufacturer = await Manufacturer.findOne({ products: { $elemMatch: { $eq: productId } } })

    claimExists.warrantyServiceProvider = { userId: manufacturer.userId, role: 'MANUFACTURER' }
    const claim = await claimExists.save()

    res.status(StatusCodes.OK).json(claim)
}

const getAllClaims = async (req, res) => {
    if (req.user.role === "CONSUMER") {
        const claims = await Claim.find().populate({ path: 'warrantyId', match: { customerId: req.user.userId }})
        res.status(StatusCodes.OK).json(claims)
    } else {
        const claims = await Claim.find({ 'warrantyServiceProvider.userId': req.user.userId })
        res.status(StatusCodes.OK).json(claims)
    }
}

export {
    createClaim,
    fillClaim,
    forwardClaim,
    getAllClaims
}