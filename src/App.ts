import express from 'express'
import cors from 'cors'

import db from './database'
import router from './router'

class App {
  public express: express.Application

  constructor () {
    this.express = express()

    this.database()
    this.middlewares()
    this.routes()
  }

  private async database () {
    try {
      await db.sync()
    } catch (err) {
      console.error(`Connection to postgreSQL failed: ${err}`)
    }
  }

  private middlewares () {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private routes () {
    this.express.use('/api', router)
  }
}

export default new App().express
