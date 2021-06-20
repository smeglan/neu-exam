var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  var cities = require("../app/assets/cities.json");
  var countries = require("../app/assets/countries.json");
  var states = require("../app/assets/states.json");
  const newCities = []
  cities.forEach(city => {
    states.forEach(state => {
      if (city.ID_STATE === state.ID_STATE) {
        countries.forEach(country => {
          if (state.ID_COUNTRY === country.ID_COUNTRY) {
            newCities.push(
              {
                ID_CITY: parseInt(city.ID_CITY),
                CITY_NAME: city.NAME,
                POPULATION: parseInt(city.POPULATION),
                STATE_NAME: state.NAME,
                COUNTRY_NAME: country.NAME
              }
            )
          }
        })
      }
    });
  });
  var fs = require('fs');
  fs.writeFile("newCities.txt", JSON.stringify(newCities), function (err) {
    if (err) {
      console.log("ERROR", err);
    }
    console.log("OK")
  });
  res.render('index', { title: "Ciudades " + newCities.length });
});

module.exports = router;
