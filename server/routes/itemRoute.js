import express from "express"
const router = express.Router()

import { getItemById, queryItemsByProductId } from "../controllers/itemController.js"

// TODO: role based access
router.route('/queryItems').get(queryItemsByProductId)
router.route('/:itemId').get(getItemById)

export default router