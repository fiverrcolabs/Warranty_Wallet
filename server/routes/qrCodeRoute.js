import express from "express"
const router = express.Router()

import { generateQRCode } from "../controllers/qrCodeController.js"

router.route('/qrgen').post(generateQRCode)

export default router