const { sequelize } = require("./models");

const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = { connectToDb };
