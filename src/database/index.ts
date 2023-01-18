import { Sequelize } from 'sequelize'

import type { Options } from 'sequelize'

import config from '../config/sequelizeCli'

const db = new Sequelize(config as Options)

export default db
