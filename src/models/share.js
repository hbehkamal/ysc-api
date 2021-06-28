const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamps = require("mongoose-timestamp");

const ShareSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  confession: { type: Schema.Types.ObjectId, ref: "Confession" },
});
ShareSchema.plugin(timestamps);

module.exports = mongoose.model("Share", ShareSchema);
