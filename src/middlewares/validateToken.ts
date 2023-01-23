import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotEnv from 'dotenv'

dotEnv.config()

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'No authHeader provided!' })
  }

  const parts = authHeader.split(' ')

  if (parts.length !== 2) {
    return res.status(401).json({ error: 'Token has more or less than 2 parts!' })
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Poorly formatted token!' })
  }

  return jwt.verify(token, process.env.AUTH_SECRET as string, (error, decoded) => {
    if (error) {
      return res.status(401).json({ error: 'Invalid token!' })
    } else {
      res.locals = {
        decoded
      }
      next()
    }
  })
}

export default validateToken
