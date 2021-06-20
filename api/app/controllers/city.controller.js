const db = require("../models");
const City = db.cities;
const Op = db.Sequelize.Op;

exports.initialize = (req, res) => {
    const newCities = require("../assets/newCities.json");
    City.bulkCreate(newCities);
    res.send("Ok created!");
}

// Create and Save a new City
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a City
    const city = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };
    // Save City in the database
    City.create(city)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the City."
            });
        });
};

// Retrieve all cities from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    City.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving cities."
            });
        });
};

// Find a single City with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    City.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving cities with id=" + id
            });
        });
};

exports.findByField = (req, res) => {
    const field = req.query.field;
    const value = req.query.value;
    let condition = null;
    switch (field) {
        case "city":
            condition = value ? { CITY_NAME: { [Op.like]: `%${value}%` } } : null;
            break;
        case "state":
            condition = value ? { STATE_NAME: { [Op.like]: `%${value}%` } } : null;
            break;
        case "country":
            condition = value ? { COUNTRY_NAME: { [Op.like]: `%${value}%` } } : null;
            break;
        default:
            res.send("No se encontraron datos");
            break;
    }
    if (condition) {
        City.findAll({ where: condition })
            .then(data => {
                console.log(data)
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving cities."
                });
            });
    }
};

// Update a City by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    City.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "City was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update City with id=${id}. Maybe City was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating City with id=" + id
            });
        });
};

// Delete a City with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    City.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "City was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete City with id=${id}. Maybe City was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete City with id=" + id
            });
        });
};
// Delete all cities from the database.
exports.deleteAll = (req, res) => {
    City.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} cities were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all cities."
            });
        });
};

// Find all published cities
exports.findAllPublished = (req, res) => {
    City.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving cities."
            });
        });
};