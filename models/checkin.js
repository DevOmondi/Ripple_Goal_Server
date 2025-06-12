"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Checkin extends Model {
    static associate(models) {
      // A Checkin belongs to a Goal
      Checkin.belongsTo(models.Goal, {
        foreignKey: "goalId",
        as: "Goal",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Checkin.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      goalId: { type: DataTypes.INTEGER, allowNull: false },
      checkinDate: DataTypes.DATE,
      value: { type: DataTypes.INTEGER, allowNull: false },
      notes: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Checkin",
      tableName: "Checkins",
      timestamps: true,
    }
  );
  return Checkin;
};
