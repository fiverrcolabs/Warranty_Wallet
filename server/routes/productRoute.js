import express from "express"
const router = express.Router()

import { getAllProducts, addProduct, getProductById } from "../controllers/productController.js"

// TODO: IF role based access
router.route('/allProducts').get(getAllProducts)
router.route('/addProduct').post(addProduct)
router.route('/:productId').get(getProductById)

export default router