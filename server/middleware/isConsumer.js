import { UnAuthenticatedError } from '../errors/index.js'

const isConsumer = (req, res, next) => {
    
    if (req.user && req.user.role!=='CONSUMER') {
        throw new UnAuthenticatedError('Authorization Invalid')
    }

    next()
}

export default isConsumer