"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Events", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      milestoneId: {
        type: Sequelize.INTEGER,
      },
      eventDate: {
        type: Sequelize.DATE,
      },
      proofUrl: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM("PLANNED", "COMPLETED", "CANCELED"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Events");
  },
};
