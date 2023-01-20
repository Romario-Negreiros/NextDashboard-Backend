'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('now')
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false
    })
  }
}
