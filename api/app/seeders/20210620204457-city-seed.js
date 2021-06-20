'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    cities = require("../assets/newCities.json")
    return queryInterface.bulkInsert('City', cities);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('City', null, {});
  }
};
