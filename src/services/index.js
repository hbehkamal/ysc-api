module.exports = class Transform {
  constructor() {
    this.model = { User };
  }

  showValidationErrors(req, res, callback) {
    let errors = req.validationErrors();
    if (errors) {
      res.status(422).json({
        message: errors.map((error) => {
          return {
            field: error.param,
            message: error.msg,
          };
        }),
        success: false,
      });
      return true;
    }
    return false;
  }

  escapeAndTrim(req, items) {
    items.split(" ").forEach((item) => {
      req.sanitize(item).escape();
      req.sanitize(item).trim();
    });
  }

  transformCollection(items) {
    return items.map(this.transform);
  }
};
