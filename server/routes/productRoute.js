import isManufacturer from '../middleware/isManufacturer.js'
import express from "express"
const router = express.Router()

import { getAllProducts, addProduct, getProductById } from "../controllers/productController.js"

// TODO: IF role based access
router.route('/allProducts').get(isManufacturer, getAllProducts)
router.route('/addProduct').post(isManufacturer, addProduct)
router.route('/:productId').get(getProductById)

export default router