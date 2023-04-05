import isManufacturer from '../middleware/isManufacturer.js'
import express from 'express'
const router = express.Router()

import {
  getRetailerFriends,
  getNonRetailerFriends,
  getRetailerRequests,
  sendRetailerRequest,
  removeRetailerRequest,
  approveRetailerRequest,
  getManufacturerSentRequests,
} from '../controllers/manufacturerController.js'

router.route('/retailerFriends').get(isManufacturer, getRetailerFriends)
router.route('/nonRetailerFriends').get(isManufacturer, getNonRetailerFriends)
router.route('/retailerRequests').get(isManufacturer, getRetailerRequests)
router.route('/getManufacturerSentRequests').get(isManufacturer, getManufacturerSentRequests)
router.route('/sendRetailerRequest').get(isManufacturer, sendRetailerRequest)
router.route('/removeRetailerRequest').get(isManufacturer, removeRetailerRequest)
router.route('/approveRetailerRequest').get(isManufacturer, approveRetailerRequest)

export default router
