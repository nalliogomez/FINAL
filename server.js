const express = require("express");
const cors = require("cors");
require('dotenv').config();

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync().then(() => {
    console.log("Sincronizacion exitosa.");
  }).catch((err) => {
    console.log("Sincronizacion fallida db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// app.get("/", (req, res) => {
//   res.json({ message: "Segundo parcial Desarrollo Web" });
// });

require("./app/routes/control.routes")(app);

const PORT = process.env.PORT_SERVER;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
