"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Goal extends Model {
    /**
     * Define associations
     */
    static associate(models) {
      // A Goal belongs to a User
      Goal.belongsTo(models.User, {
        foreignKey: "userId",
        as: "User",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      // A Goal belongs to a Cause
      Goal.belongsTo(models.Cause, {
        foreignKey: "causeId",
        as: "Cause",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });

      // A Goal can have many Checkins
      Goal.hasMany(models.Checkin, {
        foreignKey: "goalId",
        as: "Checkins",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  Goal.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      targetFrequency: { type: DataTypes.INTEGER, allowNull: false },
      frequencyUnit: {
        type: DataTypes.ENUM("times", "minutes", "days"),
        allowNull: false,
      },
      causeId: { type: DataTypes.INTEGER, allowNull: false },
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      status: {
        type: DataTypes.ENUM("ACTIVE", "COMPLETED"),
        defaultValue: "ACTIVE",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Goal",
      tableName: "Goals",
      timestamps: true,
    }
  );

  return Goal;
};
