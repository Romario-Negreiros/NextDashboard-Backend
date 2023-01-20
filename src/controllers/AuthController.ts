import { User } from '../models'
import crypto from 'crypto'

import checkNullFields from '../utils/checkNullFields'

import type { Request, Response } from 'express'

class AuthController {
  public async register(req: Request, res: Response) {
    const nullFields = checkNullFields(req.body)
    console.log(req.body)
    if (nullFields?.length) {
      return res.status(400).json({
        error: {
          message: 'Some fields are empty!',
          nullFields
        }
      })
    }

    try {
      if (await User.findOne({ where: { email: req.body.email } })) {
        return res.status(400).json({ error: 'This email is already in use!' })
      }

      // const verifyEmailToken = crypto.randomBytes(20).toString('hex')
      // const verifyEmailTokenExpiration = new Date()

      req.body.email.toLowerCase()
      const user = await User.create({
        ...req.body
      })

      return res.status(201).json({ ...user.dataValues, pwd: undefined })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }

  }
}

export default new AuthController()
