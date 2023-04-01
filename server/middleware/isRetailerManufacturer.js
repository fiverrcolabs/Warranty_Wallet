import { UnAuthenticatedError } from '../errors/index.js'

const isRetailerConsumer = (req, res, next) => {
    
    if (req.user && (req.user.role!=='RETAILER' || req.user.role!=='MANUFACTURER' )) {
        throw new UnAuthenticatedError('Authorization Invalid')
    }

    next()
}

export default isRetailerConsumer