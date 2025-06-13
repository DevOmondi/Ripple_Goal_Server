"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cause extends Model {
    static associate(models) {
      // A Cause can be contributed to by many Goals
      Cause.hasMany(models.Goal, {
        foreignKey: "causeId",
        as: "Goals",
      });
      // A Cause can have many Milestones
      Cause.hasMany(models.Milestone, {
        foreignKey: "causeId",
        as: "Milestones",
      });
    }
  }
  Cause.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      emoji: DataTypes.STRING,
      description: { type: DataTypes.STRING, allowNull: true },
      conversionRate: {
        type: DataTypes.INTEGER,
        defaultValue: 100,
        allowNull: false,
      },
      currentTotal: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Cause",
      tableName: "Causes",
      timestamps: true,
    }
  );
  return Cause;
};
