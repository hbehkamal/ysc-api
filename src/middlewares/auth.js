const jwt = require("jsonwebtoken");
const User = require(`${config.path.model}/user`);

module.exports = (req, res, next) => {
  let token = req.headers["Authorization"].slice(7);

  if (token) {
    return jwt.verify(token, config.secret, (err, decode) => {
      if (err) {
        return res.json({
          success: false,
          data: "Failed to authenticate token.",
        });
      }

      User.findById(decode.user_id, (err, user) => {
        if (err) throw err;

        if (user) {
          user.token = token;
          req.user = user;
          next();
        } else {
          return res.json({
            success: false,
            data: "User not found",
          });
        }
      });
    });
  }

  return res.status(403).json({
    data: "No Token Provided",
    success: false,
  });
};
