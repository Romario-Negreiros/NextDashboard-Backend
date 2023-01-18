import express from 'express'
import db from './database'

class App {
  public express: express.Application

  constructor () {
    this.express = express()

    this.database()
  }

  private async database (): Promise<void> {
    try {
      await db.sync()
      console.log('success')
    } catch (err) {
      console.error(`Connection to postgreSQL failed: ${err}`)
    }
  }
}

export default new App().express
