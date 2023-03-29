import isRetailer from '../middleware/isRetailer.js'
import express from 'express'
const router = express.Router()

import {
  getManufacturerFriends,
  getNonManufacturerFriends,
  getManufacturerRequests,
  sendManufacturerRequest,
  removeManufacturerRequest,
  approveManufacturerRequest
} from '../controllers/retailerController.js'

router.route('/manufacturerFriends').get(isRetailer, getManufacturerFriends)
router
  .route('/nonManufacturerFriends')
  .get(isRetailer, getNonManufacturerFriends)
router.route('/manufacturerRequests').get(isRetailer, getManufacturerRequests)
router.route('/sendManufacturerRequest').get(isRetailer, sendManufacturerRequest)
router.route('/removeManufacturerRequest').get(isRetailer, removeManufacturerRequest)
router.route('/approveManufacturerRequest').get(isRetailer, approveManufacturerRequest)

export default router
