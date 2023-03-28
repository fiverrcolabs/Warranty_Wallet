import isRetailer from '../middleware/isRetailer.js'
import express from 'express'
const router = express.Router()

import {
  getManufacturerFriends,
  getNonManufacturerFriends,
  getManufacturerRequests,
  sendRetailerRequest,
  removeManufacturerRequest,
  approveManufacturerRequest,
  getRetailerSentRequests
} from '../controllers/retailerController.js'

router.route('/manufacturerFriends').get(isRetailer, getManufacturerFriends)
router
  .route('/nonManufacturerFriends')
  .get(isRetailer, getNonManufacturerFriends)
router.route('/manufacturerRequests').get(isRetailer, getManufacturerRequests)
router.route('/sendRetailerRequest').get(isRetailer, sendRetailerRequest)
router.route('/removeManufacturerRequest').get(isRetailer, removeManufacturerRequest)
router.route('/approveManufacturerRequest').get(isRetailer, approveManufacturerRequest)
router.route('/getRetailerSentRequests').get(isRetailer, getRetailerSentRequests)

export default router
