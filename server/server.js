const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

const db = require("./app/models");

db.sequelize.sync();
// drop the table if it already exists. THis code is used for development environment only.
/*db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});
*/
// simple route
app.get("/", (req, res) => {
  const help = `
  <pre>
    Welcome to the Contact List API!

    GET /contacts
    PUT /contacts/:id
    DELETE /contacts/:id
    POST /contacts { first_name, last_name, email, phone }
    POST /contacts/import { contacts.csv }
  </pre>
  `
  res.send(help);
});

require("./app/routes/contact.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
