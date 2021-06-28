const path = require("path");

module.exports = {
  port: 8080,
  db: process.env.DB_URL,
  secret: process.env.SECRET_KEY,
  path: {
    controllers: {
      api: path.resolve("./modules/controllers/api"),
      web: path.resolve("./modules/controllers/web"),
    },
    model: path.resolve("./modules/models"),
    transform: path.resolve("./modules/transforms"),
    controller: path.resolve("./modules/controllers"),
  },
};
