'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      institute: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pwd: {
        type: Sequelize.STRING,
        minLength: 6,
        allowNull: false
      },
      resetPwdToken: {
        type: Sequelize.STRING,
        allowNull: true
      },
      resetPwdTokenExpiration: {
        type: Sequelize.DATE,
        allowNull: true
      },
      verifyEmailToken: {
        type: Sequelize.STRING,
        allowNull: true
      },
      verifyEmailTokenExpiration: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable('users')
  }
}
