import express from "express"
const router = express.Router()

import { register, login, getProfile } from "../controllers/authController.js"
import authenticateUser from '../middleware/auth.js'

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/getProfile').get(authenticateUser, getProfile)

export default router