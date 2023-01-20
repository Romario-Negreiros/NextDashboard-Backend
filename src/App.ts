import express from 'express'
import cors from 'cors'

import db from './database'
import routes from './routes'

class App {
  public express: express.Application

  constructor () {
    this.express = express()

    this.database()
    this.routes()
    this.middlewares()
  }

  private async database (): Promise<void> {
    try {
      await db.sync()
    } catch (err) {
      console.error(`Connection to postgreSQL failed: ${err}`)
    }
  }

  private async routes (): Promise<void> {
    this.express.use(routes)
  }

  private async middlewares (): Promise<void> {
    this.express.use(express.json())
    this.express.use(cors())
  }
}

export default new App().express
