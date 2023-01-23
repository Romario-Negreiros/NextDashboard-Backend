import jwt from 'jsonwebtoken'
import dotEnv from 'dotenv'

dotEnv.config()

// expirationTime: seconds
const generateJwt = (payload: Object, expirationTime: number) => {
  return jwt.sign(payload, process.env.AUTH_SECRET as string, {
    expiresIn: expirationTime
  })
}

export default generateJwt
