const app = require("express")();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressValidator = require("express-validator");
global.config = require("./modules/config");
require('dotenv').config()

const router = require("./modules/routes");

// Connect to DB
mongoose.connect(process.env.DB_URL, { useMongoClient: true });
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: "application/json" }));
app.use(expressValidator());

app.use("/api", router);

app.listen(config.port, () => {
  console.log(`Server running at Port ${global.config.port}`);
});
