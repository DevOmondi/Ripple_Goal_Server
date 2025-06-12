const { Cause } = require("../models");

const getAvailableCauses = async () => {
  return await Cause.findAll();
};

module.exports = { getAvailableCauses };
