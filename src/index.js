const app = require("express")();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressValidator = require("express-validator");
global.config = require("./config");

const router = require("./routes");

// Connect to DB
mongoose.connect(config.db, { useMongoClient: true });
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: "application/json" }));
app.use(expressValidator());

app.use("/api", router);

app.listen(config.port, () => {
  console.log(`Server running at Port ${config.port}`);
});
