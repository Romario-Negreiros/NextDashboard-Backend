import { User } from '../models'
import crypto from 'crypto'

import { mailer, checkNullFields } from '../utils'

import type { Request, Response } from 'express'

class AuthController {
  public async register(req: Request, res: Response) {
    const nullFields = checkNullFields(req.body)
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

      const verifyEmailToken = crypto.randomBytes(20).toString('hex')
      const verifyEmailTokenExpiration = new Date()

      req.body.email.toLowerCase()
      const user = await User.create({
        ...req.body,
        verifyEmailToken,
        verifyEmailTokenExpiration
      })

      await mailer.send([user.email], 'Account Creation', 'verifyEmail', {
        link: `http://localhost:3434/?token=${verifyEmailToken}&email=${user.email}`,
        name: user.name
      })

      return res.status(201).json({ ...user.dataValues, pwd: undefined })
    } catch (err) {
      if (await User.findOne({ where: { email: req.body.email } })) {
        await User.destroy({ where: { email: req.body.email } })
      }
      return res.status(500).json({ error: err.message })
    }
  }
}

export default new AuthController()
