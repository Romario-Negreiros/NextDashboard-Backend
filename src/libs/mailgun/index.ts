import Mailgun from 'mailgun.js'
import formData from 'form-data'
import dotEnv from 'dotenv'

dotEnv.config()

const apiKey = process.env.MAILGUN_API_KEY

const mailgun = new Mailgun(formData)

const mg = mailgun.client({ username: 'api', key: apiKey as string })

export default mg
