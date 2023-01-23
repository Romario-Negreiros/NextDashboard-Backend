import fs from 'fs'
import path from 'path'
import juice from 'juice'
import ejs from 'ejs'
import dotEnv from 'dotenv'

import mg from '../libs/mailgun'

dotEnv.config()

interface TemplateVars {
  name: string
  link: string
}

const domain = process.env.MAILGUN_DOMAIN

class Mailer {
  public async send(to: string[], subject: string, templateName: string, templateVars: TemplateVars) {
    const pathToTemplate = `src/libs/mailgun/templates/${templateName}.html`
    if (fs.existsSync(pathToTemplate)) {
      const template = fs.readFileSync(pathToTemplate, 'utf-8')
      const html = juice(ejs.render(template, { ...templateVars, to }))
      const response = await mg.messages.create(domain as string, {
        from: process.env.MAILGUN_EMAIL,
        to,
        subject,
        html
      })
    } else {
      throw new Error(
        'Failed to find email template, file pointed by the path does not exist!'
      )
    }
  }
}

export default new Mailer()
