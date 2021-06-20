module.exports = (sequelize, Sequelize) => {
    const City = sequelize.define("city", {
        ID_CITY: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        CITY_NAME: {
            type: Sequelize.STRING
        },
        POPULATION: {
            type: Sequelize.INTEGER
        },
        STATE_NAME: {
            type: Sequelize.STRING
        },
        COUNTRY_NAME: {
            type: Sequelize.STRING
        }
    });
    return City;
};