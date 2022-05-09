module.exports = (sequelize, Sequelize) => {
  const ContactList = sequelize.define("contact", {
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    }
  });

  return ContactList;
};
