"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Milestone extends Model {
    static associate(models) {
      // A Milestone belongs to a Cause
      Milestone.belongsTo(models.Cause, {
        foreignKey: "causeId",
        as: "Cause",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      // A Milestone can have many Events
      Milestone.hasMany(models.Event, {
        foreignKey: "milestoneId",
        as: "Events",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Milestone.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      causeId: { type: DataTypes.INTEGER, allowNull: false },
      targetValue: { type: DataTypes.INTEGER, allowNull: false },
      action: { type: DataTypes.STRING, allowNull: false },
      achievedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Milestone",
      tableName: "Milestones",
      timestamps: true,
    }
  );
  return Milestone;
};
