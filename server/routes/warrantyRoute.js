import express from 'express'
import isRetailer from '../middleware/isRetailer.js'
import isConsumer from '../middleware/isConsumer.js'
const router = express.Router()

import {
  getWarrantyById,
  queryWarranty,
  getAllWarranties,
  createWarranty,
  getWarrantyByItemId,
  assignSelf
} from '../controllers/warrantyController.js'

// TODO: depends on role based access
router.route('/createWarranty').post(isRetailer, createWarranty)
router.route('/getAllWarranties').get(getAllWarranties)
router.route('/getWarrantyByItemId').get(getWarrantyByItemId)
router.route('/queryWarranty').get(queryWarranty)
router.route('/assignSelf').patch(isConsumer, assignSelf)
router.route('/:warrantyId').get(getWarrantyById)

export default router
