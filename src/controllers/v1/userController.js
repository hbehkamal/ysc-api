const Controller = require(`${config.path.controller}/controller`);
const UserTransform = require(`${config.path.transform}/v1/userTransform`);

module.exports = new (class UserController extends Controller {
  index(req, res) {
    this.model.User.find({}, (err, users) => {
      if (err) throw err;
      if (users) {
        return res.json(users);
      }
      return res.json("No user found");
    });
  }
})();
