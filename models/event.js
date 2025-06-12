"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      // An Event belongs to a Milestone
      Event.belongsTo(models.Milestone, {
        foreignKey: "milestoneId",
        as: "Milestone",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Event.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      milestoneId: { type: DataTypes.INTEGER, allowNull: false },
      eventDate: DataTypes.DATE,
      proofUrl: DataTypes.STRING,
      status: DataTypes.ENUM("PLANNED", "COMPLETED", "CANCELED"),
    },
    {
      sequelize,
      modelName: "Event",
      tableName: "Events",
      timestamps: true,
    }
  );
  return Event;
};
