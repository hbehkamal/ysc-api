const Controller = require(`${config.path.controller}/Controller`);
const UserTransform = require(`${config.path.transform}/v1/UserTransform`);
const bcrypt = require("bcrypt");

module.exports = new (class CourseController extends Controller {
  register(req, res) {
    const { name, email, password, mobile, username, role } = req.body;
    req.checkBody("name", "وارد کردن فیلد نام الزامیست").notEmpty();
    req.checkBody("password", "وارد کردن فیلد پسورد الزامیست").notEmpty();
    req.checkBody("mobile", "وارد کردن فیلد موبایل الزامیست").notEmpty();
    req.checkBody("username", "وارد کردن نام کاربری الزامیست").notEmpty();

    if (email) {
      req.checkBody("email", "فرمت اییمل وارد شده صحیح نیست").isEmail();
    }

    if (this.showValidationErrors(req, res)) return;

    this.model
      .User({
        name,
        email,
        password,
        mobile,
        username,
        role,
      })
      .save((err, user) => {
        if (err) {
          if (err.code == 11000) {
            return res.json({
              data: "ایمیل نمی تواند تکراری باشد",
              success: false,
            });
          } else {
            throw err;
          }
        }
        if (user) {
          return res.json({
            message: "کاربر با موفقیت عضو وبسایت شد",
            data: new UserTransform().transform(user._doc, true),
            success: true,
          });
        }
      });
  }

  login(req, res) {
    req.checkBody("email", "وارد کردن فیلد ایمیل الزامیست").notEmpty();
    req.checkBody("password", "وارد کردن فیلد پسورد الزامیست").notEmpty();

    if (this.showValidationErrors(req, res)) return;

    this.model.User.findOne({ email: req.body.email }, (err, user) => {
      if (err) throw err;

      if (user == null)
        return res.status(422).json({
          data: "اطلاعات وارد شده صحیح نیست",
          success: false,
        });

      bcrypt.compare(req.body.password, user.password, (err, status) => {
        if (!status)
          return res.status(422).json({
            success: false,
            data: "پسورد وارد شده صحیح نمی باشد",
          });

        return res.json({
          data: new UserTransform().transform(user, true),
          success: true,
        });
      });
    });
  }
})();
