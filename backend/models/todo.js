"use strict";

module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "Todo",
    {
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "todos",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
    },
  );

  return Todo;
};
