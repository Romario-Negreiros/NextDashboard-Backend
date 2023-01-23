import express from 'express'

import { authController } from './controllers'

const router = express.Router()

router.post('/register', authController.register)
router.get('/verify-email/:email/:token', authController.verifyEmail)

export default router
