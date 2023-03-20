import { UnAuthenticatedError } from '../errors/index.js'

const isRetailer = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (req.user.role && !req.user.role==='RETAILER') {
        throw new UnAuthenticatedError('Authorization Invalid')
    }

    next()
}

export default isRetailer