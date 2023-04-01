import isRetailer from '../middleware/isRetailer.js'
import isConsumer from '../middleware/isConsumer.js'
import express from "express"
const router = express.Router()

import {
    createClaim,
    fillClaim,
    forwardClaim,
    getAllClaims
} from "../controllers/claimController.js"

// TODO: IF role based access
router.route('/createClaim').post(isConsumer, createClaim)
router.route('/fillClaim').post(isRetailer, fillClaim)
router.route('/forwardClaim').post(isRetailer, forwardClaim)
router.route('/getAllClaims').get(getAllClaims)

export default router