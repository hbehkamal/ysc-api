const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamps = require("mongoose-timestamp");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: "user" },
  verified: { type: Boolean, required: true, default: false },
  gender: { type: String },
  avatar_url: { type: String },
  banner_url: { type: String },
  confessions: [{ type: Schema.Types.ObjectId, ref: "Confession" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
  shares: [{ type: Schema.Types.ObjectId, ref: "Share" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});
UserSchema.plugin(timestamps);

UserSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) throw err;
    this.password = hash;
    next();
  });
});

module.exports = mongoose.model("User", UserSchema);
