const path = require("path");
require('dotenv').config()

module.exports = {
  port: 8080,
  db: process.env.DB_URL,
  secret: process.env.SECRET_KEY,
  path: {
    controllers: {
      api: path.resolve("./src/controllers/api"),
    },
    model: path.resolve("./src/models"),
    transform: path.resolve("./src/transforms"),
    controller: path.resolve("./src/controllers"),
  },
};
