import express from 'express'

import { authController } from './controllers'

const routes = express.Router()

routes.post('/register', authController.register)

export default routes
