import express from 'express'
import db from './database'
import routes from './routes'

class App {
  public express: express.Application

  constructor () {
    this.express = express()

    this.database()
    this.routes()
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
}

export default new App().express
