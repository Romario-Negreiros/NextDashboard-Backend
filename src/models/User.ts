import { Model, DataTypes } from 'sequelize'
import bcrypt from 'bcryptjs'
import db from '../database'

class User extends Model {
  public readonly id!: number
  public institute!: string
  public email!: string
  public name!: string
  public pwd!: string
  public resetPwdToken!: string | null
  public resetPwdTokenExpiration!: Date | null
  public verifyEmailToken!: string | null
  public verifyEmailTokenExpiration!: Date | null
  public updatedAt!: Date | null
  public readonly createdAt!: Date
}

User.init({
  id: DataTypes.INTEGER,
  institute: DataTypes.STRING,
  email: DataTypes.STRING,
  name: DataTypes.STRING,
  pwd: DataTypes.STRING,
  resetPwdToken: DataTypes.STRING,
  resetPwdTokenExpiration: DataTypes.DATE,
  verifyEmailToken: DataTypes.STRING,
  verifyEmailTokenExpiration: DataTypes.DATE
}, {
  tableName: 'users',
  sequelize: db,
  hooks: {
    beforeCreate: async user => {
      const hash = await bcrypt.hash(user.pwd, 15)
      user.pwd = hash
    },
    beforeUpdate: async user => {
      const hash = await bcrypt.hash(user.pwd, 15)
      user.pwd = hash
      user.updatedAt = new Date()
    }
  }
})

export default User
