import { UnAuthenticatedError } from '../errors/index.js'

const isManufacturer = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (req.user.role && !req.user.role==='MANUFACTURER') {
        throw new UnAuthenticatedError('Authorization Invalid')
    }

    next()
}

export default isManufacturer