import { UnAuthenticatedError } from '../errors/index.js'

const isManufacturer = (req, res, next) => {

    if (req.user && req.user.role!=='MANUFACTURER') {
        throw new UnAuthenticatedError('Authorization Invalid')
    }

    next()
}

export default isManufacturer