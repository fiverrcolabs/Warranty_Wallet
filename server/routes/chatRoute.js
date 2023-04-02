import express from "express"
const router = express.Router()

import { saveChat, getChatByClaimId } from "../controllers/chatController.js"
import authenticateUser from '../middleware/auth.js'

router.route('/getChatByClaimId').get(getChatByClaimId)
router.route('/saveChat').post(saveChat)


export default router