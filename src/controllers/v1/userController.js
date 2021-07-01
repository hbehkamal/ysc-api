const { json } = require("body-parser");

const Controller = require(`${config.path.controller}/controller`);
const UserTransform = require(`${config.path.transform}/v1/userTransform`);

module.exports = new (class UserController extends Controller {
  index(req, res) {
    this.model.User.find({}, (err, users) => {
      if (err) throw err;
      if (users) {
        return res.json({
          status: true,
          data: users.map((user) => new UserTransform().transform(user._doc)),
        });
      }
      return res.json("No user found");
    });
  }

  get(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.json({
        status: false,
        message: "please send user id",
      });
    }
    this.model.User.findOne({ _id: id }, (err, user) => {
      if (err) throw err;

      if (user) {
        return res.json({
          status: true,
          data: new UserTransform().transform(user),
        });
      }
      return res.json("No user found");
    });
  }

  getUserById = async (id) => {
    return this.model.User.findById(id);
  };

  put = async (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(422).json({
        message: "No user ID provided",
        status: false,
      });
    }

    const user = await this.getUserById(id);

    // TODO: Implement email\... validation

    Object.assign(user, req.body);

    await user.save();
    return res.json({ status: true, data: new UserTransform().transform(user) });
  };
})();
