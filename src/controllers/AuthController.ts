import { User } from '../models'
import crypto from 'crypto'

import { mailer, checkNullFields, generateJwt } from '../utils'

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
      verifyEmailTokenExpiration.setHours(verifyEmailTokenExpiration.getHours() + 1)

      req.body.email.toLowerCase()
      const user = await User.create({
        ...req.body,
        verifyEmailToken,
        verifyEmailTokenExpiration
      })

      await mailer.send([user.email], 'Account Creation', 'verifyEmail', {
        link: `http://localhost:3434/verify-email?email=${user.email}&token=${verifyEmailToken}`,
        name: user.name
      })

      return res.status(201).json({ ...user.dataValues, pwd: undefined })
    } catch (err) {
      if (await User.findOne({ where: { email: req.body.email } })) {
        await User.destroy({ where: { email: req.body.email } })
      }
      return res.status(500).json({ error: 'Internal server error, please try again!' })
    }
  }

  public async verifyEmail(req: Request, res: Response) {
    const nullFields = checkNullFields(req.params)
    if (nullFields?.length) {
      return res.status(400).json({
        error: {
          message: 'Some fields are empty!',
          nullFields
        }
      })
    }

    try {
      const { email, token } = req.params
      const user = await User.findOne({ where: { email } })
      const now = new Date()

      if (!user) {
        return res.status(404).json({ error: 'This user does not exist!' })
      }

      if (!user.verifyEmailToken || !user.verifyEmailTokenExpiration) {
        return res
          .status(400)
          .json({ error: 'This email has already been verified!' })
      }

      if (user.verifyEmailToken !== token) {
        return res.status(400).json({ error: 'Invalid token!' })
      }

      if (now > user?.verifyEmailTokenExpiration) {
        await user.destroy()
        return res
          .status(400)
          .json({
            error:
              'Token expirated, create your account again and verify it in time!'
          })
      }

      user.verifyEmailToken = null
      user.verifyEmailTokenExpiration = null

      await user.save({ hooks: false })

      // expirationTime: 86400 seconds = 1 day
      const jwt = generateJwt({ id: user.id, email: user.email }, 86400)

      return res.status(200).json({ ...user.dataValues, pwd: null, jwt })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Internal server error, please try again!' })
    }
  }
}

export default new AuthController()
