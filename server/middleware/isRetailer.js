import { UnAuthenticatedError } from '../errors/index.js'

const isRetailer = (req, res, next) => {
    
    if (req.user && req.user.role!=='RETAILER') {
        throw new UnAuthenticatedError('Authorization Invalid')
    }

    next()
}

export default isRetailer