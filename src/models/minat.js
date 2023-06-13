const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const minatSchema = new Schema(
  {
    minat: { type: Array, required: true },
  },
  { strict: false, timestamps: true }
  // { timestamps: true }
);

const Minat = mongoose.model("Minat", minatSchema);

module.exports = Minat;
