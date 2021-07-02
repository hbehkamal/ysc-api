const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamps = require("mongoose-timestamp");

const TagSchema = new Schema({
  name: { type: String, required: true },
  confession: [{ type: Schema.Types.ObjectId, ref: "Confession" }],
});
TagSchema.plugin(timestamps);

module.exports = mongoose.model("Tag", TagSchema);
