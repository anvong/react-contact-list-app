const db = require("../models");
const ContactList = db.contact;
const Op = db.Sequelize.Op;

// Create and Save a new Contact
exports.create = (req, res) => {
  // Validate request
  if (!req.body.first_name && !req.body.last_name && !req.body.email && !req.body.phone) {
    res.status(400).send({
      message: "Contents can not be empty!"
    });
    return;
  }

  // Create a Contact
  const contact = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone
  };

  // Save Contact in the database
  ContactList.create(contact)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Contact."
      });
    });
};

// Retrieve all Contacts from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  ContactList.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving contacts."
      });
    });
};

// Find a single Contact with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ContactList.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Contact with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Contact with id=" + id
      });
    });
};

// Update a Contact by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  ContactList.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Contact was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Contact with id=${id}. Maybe Contact was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Contact with id=" + id
      });
    });
};

// Delete a Contact with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  ContactList.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Contact was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Contact with id=${id}. Maybe Contact was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Contact with id=" + id
      });
    });
};

// Delete all Contacts from the database.
exports.deleteAll = (req, res) => {
  ContactList.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Contacts were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all contacts."
      });
    });
};

// Import and Save a new Contacts
exports.import = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Contents can not be empty!"
    });
    return;
  }

  const contacts = req.body;
  
  ContactList.bulkCreate

  ContactList.bulkCreate(contacts).then((data) => {
    console.log("Contacts data have been saved");
    res.send(data);
  });

};
