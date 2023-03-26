import express from "express"
const router = express.Router()

import { generateQRCodes } from "../controllers/qrCodeController.js"

// TODO: role based access
router.route('/generateQR').post(generateQRCodes)

export default router