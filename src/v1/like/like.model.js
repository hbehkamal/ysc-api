const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamps = require("mongoose-timestamp");

const LikeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  confession: { type: Schema.Types.ObjectId, ref: "Confession" },
});
LikeSchema.plugin(timestamps);

module.exports = mongoose.model("Like", LikeSchema);
