import express from "express"
const router = express.Router()

import { getItemById, queryItemsByProductId, queryItemsCountByProductId } from "../controllers/itemController.js"

// TODO: role based access
router.route('/queryItems').get(queryItemsByProductId)
router.route('/itemCount').get(queryItemsCountByProductId)
router.route('/:itemId').get(getItemById)

export default router