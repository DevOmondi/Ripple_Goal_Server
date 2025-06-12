require("dotenv").config();
module.exports = {
  development: {
    username: "postgres",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "ripple_goal",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "postgres",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "ripple_goal",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "postgres",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "ripple_goal",
    host: "127.0.0.1",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
