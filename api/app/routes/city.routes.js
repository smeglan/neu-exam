const cities = require("../controllers/city.controller.js");
var express = require('express');
var router = express.Router();

// Create a new city
router.post("/", cities.create);

// Retrieve all cities
router.get("/", cities.findAll);

// Retrieve all cities
router.get("/findByField/", cities.findByField);

// Retrieve all cities
router.get("/initialize", cities.initialize);

// Retrieve all published cities
router.get("/published", cities.findAllPublished);

// Retrieve a single city with id
router.get("/:id", cities.findOne);

// Update a city with id
router.put("/:id", cities.update);

// Delete a city with id
router.delete("/:id", cities.delete);

// Delete all city
router.delete("/", cities.deleteAll);

module.exports = router;
