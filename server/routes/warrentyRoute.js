import express from "express"
const router = express.Router()

import { getWarrantyById, queryWarranty, getAllWarranties, createWarranty } from "../controllers/warrentyController.js"

// TODO: depends on role based access
router.route('/createWarrenty').post(createWarranty)
router.route('/getAllWarrenties').get(getAllWarranties)
router.route('/queryWarrenty').get(queryWarranty)
router.route('/:warrentyId').get(getWarrantyById)

export default router