import { UnAuthenticatedError } from '../errors/index.js'

const isConsumer = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (req.user.role && !req.user.role==='CONSUMER') {
        throw new UnAuthenticatedError('Authorization Invalid')
    }

    next()
}

export default isConsumer