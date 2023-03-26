import express from "express"
const router = express.Router()

import { getWarrentyById, queryWarrenty, getAllWarrenties, createWarrenty } from "../controllers/warrentyController.js"

// TODO: role based access
router.route('/createWarrenty').post(createWarrenty)
router.route('/getAllWarrenties').get(getAllWarrenties)
router.route('/queryWarrenty').get(queryWarrenty)
router.route('/:warrentyId').get(getWarrentyById)

export default router