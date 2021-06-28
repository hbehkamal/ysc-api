const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamps = require("mongoose-timestamp");

const ConfessionSchema = new Schema({
  title: { type: String },
  content: { type: String, required: true },
  anonymous: { type: Boolean, required: true, default: true },
  is_comment: { type: Boolean, required: true, unique: false },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  likes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
  shares: [{ type: Schema.Types.ObjectId, ref: "Share" }],
});
ConfessionSchema.plugin(timestamps);

module.exports = mongoose.model("Confession", ConfessionSchema);
